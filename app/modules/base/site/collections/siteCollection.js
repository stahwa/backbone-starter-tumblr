'use strict';

var APIinfo = require('util/APIinfo');
var postsModel = Backbone.Model.extend();


var SiteCollection = Backbone.Collection.extend({

	model: postsModel,
  url: APIinfo.createAPIurl(),
  // offset: 0,

  // OFFSET_AMT: 20,

  parse: function(response) {
    return response.response.posts;
  },

  initialize: function(models, options) {
    console.log('SITECOLLECTION', options)

    BB.collections._info[options.type] = {
      offset: 0,
      limit: options.limit,
      tag: options.tag,
      type: options.type
    }

    // So the pubSub this.offset can see this ----------------
    _.bindAll(this, 'fetchSuccess');

    this.fetchPosts(models, options);
  },

  fetchPosts: function(models, options) {
    // this.offset = options.initialOffset
    console.log('fetchposts')
    this.fetch({
      data: $.param({ tag: options.tag, offset: options.offset, limit: options.limit }),
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

    BB.collections[options.type] = collection;
    var currLoadedPostAmt = BB.collections._info[options.type].currLoadedPostAmt = collection.length;
    var totalPosts = BB.collections._info[options.type].totalPosts = response.response.total_posts;
    var limit = BB.collections._info[options.type].limit;


    // IF SOME POSTS ARE LOADED ----------------------------
    if (currLoadedPostAmt < totalPosts) {

      // console.log('BB',BB)
      // console.log('currLoadedPostAmt',currLoadedPostAmt)
      // console.log('totalPosts', totalPosts)

      if (currLoadedPostAmt == limit) {
        Backbone.pubSub.trigger(options.type+'_prelimCollectionRetrieved', this.offset);
      };

      this.fetchPosts([], {tag: BB.collections._info[options.type].tag, type: BB.collections._info[options.type].type, limit: BB.collections._info[options.type].limit, offset: currLoadedPostAmt})

      currLoadedPostAmt = currLoadedPostAmt + BB.collections._info[options.type].limit;
    };


    // IF ALL POSTS ARE LOADED ----------------------------
    if (currLoadedPostAmt == totalPosts) {
      if (BB.collections._info[options.type].type == 'carousel') {
        Backbone.pubSub.trigger(options.type+'_fullCollectionRetrieved', this.offset);
      };
      if (BB.currPage == 'permalink') {
        Backbone.pubSub.trigger('perma_fullCollectionRetrieved', this.offset);
      };
    }

  },

  fetchError: function (collection, response) {
    console.log('fetchError');
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