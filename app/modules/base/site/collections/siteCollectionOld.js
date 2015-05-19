'use strict';

var APIinfo = require('util/APIinfo');
var postsModel = Backbone.Model.extend();


var SiteCollection = Backbone.Collection.extend({

	model: postsModel,
  url: APIinfo.createAPIurl(),
  offset: 0,

  // OFFSET_AMT: 20,

  parse: function(response) {
    return response.response.posts;
  },

  initialize: function(models, options) {
    // this.tag = options.tag;
    // console.log('sitecollection this.tag',options.tag)

    // So the pubSub this.offset can see this ----------------
    _.bindAll(this, 'fetchSuccess');

    this.fetchPosts(models, options);
  },

  fetchPosts: function(models, options) {
    this.offset = options.offset
    this.fetch({
      data: $.param({ tag: options.tag, offset: this.offset }),
      type: options.type,
      success: this.fetchSuccess,
      error: this.fetchError,
      remove: false
    });
  },

  sync: function(method, model, options) {
    var that = this;
      var params = _.extend({
          type: 'GET',
          dataType: 'jsonp',
          url: that.url,
          processData: false
      }, options);

    return $.ajax(params);
  },

  fetchSuccess: function (collection, response, options) {
    // console.log('API call success collection', collection, response, options);

    BB.collections[options.type] = collection;
    BB.collections._info[options.type] = {
      totalPosts: response.response.total_posts,
      currPostAmt: collection.length
    }

    Backbone.pubSub.trigger(options.type+'_collectionRetrieved', this.offset);
  },

  fetchError: function (collection, response) {
    console.log('fetchError');
  },

  getMorePosts: function(models, options) {
    this.offset = this.offset + options.offset;
    options.offset = this.offset
    this.fetchPosts(models, options)
  },

  dispose: function() {
    console.log('SiteCollection dispose')
    BB.collections.posts = {};
    BB.collections.carousel = {};

    BB.collections.posts = null;
    BB.collections.carousel = null;

    this.fetchSuccess = null;
    this.fetchError = null;
    this.fetch = null;
    this.fetchPosts = null;

    this.remove();
  }

 
});

module.exports = SiteCollection;