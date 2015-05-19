'use strict';

var BaseView = require('base/baseView');
var SiteCollection = require('modules/base/site/collections/siteCollection');
var PostItemView = require('modules/base/components/postItem/views/postItemView');


module.exports = BaseView.extend({

  template: require('../templates/posts.hbs'),
  events: {
    'click .load_more_btn': 'showMorePosts'
  },

  OFFSET_AMT: 9,
  POST_TYPE: 'posts',
  // ALL_POSTS_LOADED: false,


  initialize: function() {

    // MOVED THE TEMPLATE AND RENDER UP HERE....TEST IT
    this.$el.html( this.template );
    this.render();

    this.postsArr = [];

    this.listenTo(Backbone.pubSub, 'posts_prelimCollectionRetrieved', this.createInitialPosts);
    if (BB.collections.posts) {
      // console.log('yes posts exist BBcollection', BB.collections._info.posts)
      BB.collections._info.posts.offset = 0;
      this.createInitialPosts();
    }
  	
    // this.$el.html( this.template );
    // this.render();
  },

  createInitialPosts: function() {

    var offset = BB.collections._info.posts.offset;
    // console.log('createInitialPosts offset',offset)

    var models = BB.collections.posts.models;
    var arrToIterate = models.slice(0, this.OFFSET_AMT);

    for (var i = 0; i < arrToIterate.length; i++) {
      this.addPostItem(models[offset+i])
    };

    BB.collections._info[this.POST_TYPE].currPostAmt = this.OFFSET_AMT;

    this.checkForMore();

    // If there are more posts to load then load them into collection
    // if (BB.collections._info.posts.allPostsLoaded == false) {
    //   console.log('allPostsLoaded is false')
    //   if (BB.collections._info[this.POST_TYPE].currPostAmt != BB.collections._info[this.POST_TYPE].total_posts) {
    //     console.log('createInitialPosts STILL MORE TO LOAD', BB.collections._info[this.POST_TYPE].type)
    //     this.loadRemainder();
    //   } 
      
    // };

  },

  addPostItem: function(mod) {
    var postItemView = new PostItemView({ model: mod });
    postItemView.attachTo('.posts_wrap');
    this.postsArr.push(postItemView);
    // console.log('added')
  },

  checkForMore: function() {
    var posts = BB.collections._info[this.POST_TYPE];
    // console.log('check',posts.currPostAmt)
    // console.log('check', posts.totalPosts)
    if (posts.currPostAmt == posts.totalPosts) {
      $('.load_more_btn').css('visibility', 'hidden');
    };
  },

  render: function() {
  	// this.$el.html( this.template({collection: this.postsCollection.toJSON()}) );
    return this;
  },

  // loadMorePosts: function() {
  //   BB.collections.posts.getMorePosts([], {tag: 'featured', type: this.POST_TYPE, offset: this.OFFSET_AMT, limit: this.OFFSET_AMT});
  // },

  // loadRemainder: function() {
  //   console.log('loadRemainder BB',BB)
  //   BB.collections.posts.loadRemainder([], {tag: 'featured', type: this.POST_TYPE, offset: BB.collections._info.posts.currPostAmt});
  // },

  showMorePosts: function() {
    // console.log('post collection',BB.collections._info[this.POST_TYPE].currPostAmt)

    var models = BB.collections[this.POST_TYPE].models;
    var currPostAmt = BB.collections._info[this.POST_TYPE].currPostAmt;
    var offset = currPostAmt + this.OFFSET_AMT;
    var arrToIterate = models.slice(currPostAmt, offset);

    for (var i = 0; i < arrToIterate.length; i++) {
      this.addPostItem(models[currPostAmt+i])
    };

    BB.collections._info.posts.currPostAmt = offset

    if (BB.collections._info.posts.currPostAmt >= BB.collections._info.posts.totalPosts) {
      BB.collections._info.posts.currPostAmt = BB.collections._info.posts.totalPosts
      $('.load_more_btn').css('visibility', 'hidden');
    }
    

    // this.checkForMore();
  },

  dispose: function(arg) {
    console.log('postsView dispose')
    // console.log('this.addPostItem',this.addPostItem)

    for (var post in this.postsArr) {
      this.postsArr[post].dispose();
    }

    // this.postsCollection.dispose();

    // for (var i = 0; i < this.postsCollection.models.length; i++) {
      // delete this.postsCollection.models[i]
      // this.postsCollection.models[i] = null;
    // };

    // delete this.postsCollection;
    // delete this.postsArr;

    // this.postsCollection = null;
    this.postsArr = null;
    // this.addPostItem = null;
    // this.checkForMore = null;
    // this.getImages = null;

    // console.log('this.postsCollection',this.postsCollection)

    // delete $('.posts_wrap').prevObject
    // this.postItemView.dispose();
    BaseView.prototype.dispose.apply(this, arguments);
    
  }


});
