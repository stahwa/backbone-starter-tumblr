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
    console.log('SITECOLLECTION', options)

    BB.collections._info[options.type] = {
      offset: this.offset,
      limit: options.limit,
      tag: options.tag,
      type: options.type,
      loadRemainder: false,
      allPostsLoaded: false
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
    // console.log('API call success collection', collection, response, options);
    if (BB.collections._info[options.type].loadRemainder == false) {
      console.log('fetchSuccess Initial load', BB.collections._info[options.type].type)
      BB.collections[options.type] = collection;
      BB.collections._info[options.type].totalPosts = response.response.total_posts;
      BB.collections._info[options.type].currLoadedPostAmt = collection.length;

      Backbone.pubSub.trigger(options.type+'_collectionRetrieved', this.offset);
    } else {
      console.log('fetchSuccess load the rest')
      BB.collections._info[options.type].currLoadedPostAmt = collection.length;
      this.loadRemainder([],{tag: 'featured', type: BB.collections._info[options.type].type, offset: BB.collections._info[options.type].currLoadedPostAmt});
    }

  },

  fetchError: function (collection, response) {
    console.log('fetchError');
  },

  getMorePosts: function(models, options) {
    this.offset = this.offset + options.offset;
    options.offset = this.offset
    this.fetchPosts(models, options)
  },

  loadRemainder: function(models, options) {
    console.log('sitecollection loadRemainder', options)

    if (BB.collections._info[options.type].currLoadedPostAmt == BB.collections._info[options.type].totalPosts) {
      
      // If all posts loaded
      BB.collections._info[options.type].loadRemainder = false;
      BB.collections._info[options.type].allPostsLoaded = true;
    } else {
      console.log('NEED MORE currLoadedPostAmt', BB.collections._info[options.type].currLoadedPostAmt)
      console.log('NEED MORE total_posts', BB.collections._info[options.type].totalPosts)
      BB.collections._info[options.type].loadRemainder = true;

      // this.offset = this.offset + options.offset;
      options.offset = BB.collections._info[options.type].currLoadedPostAmt
      // console.log('loadremainer offset', BB.collections._info[options.type].currLoadedPostAmt)
      this.fetchPosts(models, options)
    }
    
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