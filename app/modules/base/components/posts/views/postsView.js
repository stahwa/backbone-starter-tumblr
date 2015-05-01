'use strict';

var SiteCollection = require('modules/base/site/collections/siteCollection');


module.exports = Backbone.View.extend({

  template: require('../templates/posts.hbs'),

  initialize: function() {
  	this.listenTo(Backbone.pubSub, 'posts_collectionRetrieved', this.render);
    // this.$el.html( this.template );
    this.getImages();
    this.render();
  },

  getImages: function() {
  	this.postsCollection = new SiteCollection([], {tag: 'featured', type: 'posts'});
  },

  render: function() {
  	this.$el.html( this.template({collection: this.postsCollection.toJSON()}) );
    return this;
  }


});
