'use strict';

var BaseView = require('base/baseView');
var SiteCollection = require('modules/base/site/collections/siteCollection');
var PostItemView = require('modules/base/components/postItem/views/postItemView');


module.exports = BaseView.extend({

  template: require('../templates/posts.hbs'),
  events: {
    'click .load_more_btn': 'loadMorePosts'
  },


  initialize: function() {
  	this.listenTo(Backbone.pubSub, 'posts_collectionRetrieved', this.createPostItem);
    this.$el.html( this.template );
    this.render();
    this.getImages();
  },

  getImages: function() {
  	this.postsCollection = new SiteCollection([], {tag: 'featured', type: 'posts'});
    this.postsArr = [];
  },

  createPostItem: function(offsetAmt) {
    console.log('createPostItem offsetAmt',offsetAmt)
    console.log('this.postsCollection',this.postsCollection)
    
    // this.postsCollection.each(this.addPostItem, this);

    var models = this.postsCollection.models;
    var arrToIterate = models.slice(offsetAmt);

    for (var i = 0; i < arrToIterate.length; i++) {
      this.addPostItem(models[offsetAmt+i])
    };
  },

  addPostItem: function(mod) {
    var postItemView = new PostItemView({ model: mod });
    postItemView.attachTo('.posts_wrap');
    this.postsArr.push(postItemView);
    // console.log('this.postsArr', this.postsArr)
  },

  render: function() {
  	// this.$el.html( this.template({collection: this.postsCollection.toJSON()}) );
    return this;
  },

  loadMorePosts: function() {
    this.postsCollection.getMorePosts();
  },

  dispose: function(arg) {
    console.log('postsView dispose')
    for (var post in this.postsArr) {
      this.postsArr[post].dispose();
    }
    // this.postItemView.dispose();
    BaseView.prototype.dispose.apply(this, arguments);
    
  }


});
