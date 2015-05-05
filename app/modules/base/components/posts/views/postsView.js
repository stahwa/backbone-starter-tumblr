'use strict';

var BaseView = require('base/baseView');
var SiteCollection = require('modules/base/site/collections/siteCollection');
var PostItemView = require('modules/base/components/postItem/views/postItemView');


module.exports = BaseView.extend({

  template: require('../templates/posts.hbs'),


  initialize: function() {
  	this.listenTo(Backbone.pubSub, 'posts_collectionRetrieved', this.createPostItem);
    this.$el.html( this.template );
    this.render();

    this.getImages();
    
  },

  getImages: function() {
  	this.postsCollection = new SiteCollection([], {tag: 'featured', type: 'posts'});
    // BB.collections.allPosts = this.postsCollection;
  },

  createPostItem: function() {
    this.postsArr = [];
    this.postsCollection.each(this.addPostItem, this);
  },

  addPostItem: function(mod) {
    var postItemView = new PostItemView({ model: mod });
    postItemView.attachTo('.posts_wrap');
    this.postsArr.push(postItemView);
    // $('.posts_wrap').append(postItemView.render().el)
  },

  render: function() {
  	// this.$el.html( this.template({collection: this.postsCollection.toJSON()}) );
    return this;
  },

  dispose: function(arg) {
    for (var post in this.postsArr) {
      this.postsArr[post].dispose();
    }
    // this.postItemView.dispose();
    BaseView.prototype.dispose.apply(this, arguments);
    
  }


});
