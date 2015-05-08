'use strict';

var APIinfo = require('util/APIinfo');
var postsModel = Backbone.Model.extend();


var SiteCollection = Backbone.Collection.extend({

	model: postsModel,
  url: APIinfo.createAPIurl(),

  parse: function(response) {
    return response.response.posts;
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

  initialize: function(models, options) {
    // this.tag = options.tag;
    // console.log('sitecollection this.tag',options.tag)


    this.fetch({
    	data: $.param({ tag: options.tag}),
      type: options.type,
      success: this.fetchSuccess,
      error: this.fetchError
    });
  },

  fetchSuccess: function (collection, response, options) {
    BB.collections[options.type] = collection;
  	// console.log('API call success collection', collection, options);
    Backbone.pubSub.trigger(options.type+'_collectionRetrieved');
  },

  fetchError: function (collection, response) {
    console.log('fetchError');
  }

 
});

module.exports = SiteCollection;