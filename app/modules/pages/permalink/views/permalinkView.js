
'use strict';

var BaseView = require('base/baseView');
var SiteCollection = require('modules/base/site/collections/siteCollection');
var PermalinkContentView = require('modules/pages/permalink/views/permalinkContentView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'permalink_container main_comp',
  attributes: {
    'data-page': 'permalink'
  },
  template: require('../templates/permalink.hbs'),
  events: {
    'click .prev_btn': 'prevPost',
    'click .next_btn': 'nextPost'
  },

  initialize: function () {
    this.listenTo(Backbone.pubSub, 'perma_fullCollectionRetrieved', this.filterPosts);
    this.listenTo(Backbone.pubSub, 'posts_found', this.createPages);
    // this.permaCollection = new SiteCollection([], {tag: 'featured', type: 'perma', offset: 0});
    
    this.attachTo('.main_container');
  },

  render: function () {
    this.$el.html( this.template( this.model.toJSON()) );
    if (BB.collections.posts) {
      this.filterPosts();
    }
    
    return this;
  },

  loadRemainder: function() {
    BB.collections.posts.loadRemainder([], {tag: 'featured', type: this.POST_TYPE, offset: BB.collections._info.posts.currPostAmt});
  },

  prevPost: function() {
    this.manageClasses('previous');
    this.setCurrPlace('previous');
    this.setupPrevPost();

    var permalinkContentPrevView = new PermalinkContentView({model: this.prevModel});
    permalinkContentPrevView.preAttachTo('.permalink_content');

    this.garbageCollect('previous', permalinkContentPrevView);
    this.setHistory();
  },

  nextPost: function() {
    this.manageClasses('next');
    this.setCurrPlace('next');
    this.setupNextPost();

    var permalinkContentNextView = new PermalinkContentView({model: this.nextModel});
    permalinkContentNextView.attachTo('.permalink_content');

    this.garbageCollect('next', permalinkContentNextView);
    this.setHistory();
  },

  manageClasses: function(direction) {
    if (direction == 'previous') {
      $('.next').remove();
      $('.current').removeClass('current').addClass('next');
      $('.previous').addClass('current').removeClass('previous');

    } else if (direction == 'next') {
      $('.previous').remove();
      $('.current').removeClass('current').addClass('previous');
      $('.next').addClass('current').removeClass('next');
    };
  },

  setCurrPlace: function(direction) {
    if (direction == 'previous') {
      if (this.model.get('currPlaceInArr') == 0) {
        this.model.set('currPlaceInArr', BB.collections.posts.models.length-1);
      } else {
        this.model.set('currPlaceInArr', this.model.get('currPlaceInArr')-1);
      }

    } else if (direction == 'next') {
      if (this.model.get('currPlaceInArr') == (BB.collections.posts.models.length-1)) {
        this.model.set('currPlaceInArr', 0);
      } else {
        this.model.set('currPlaceInArr', this.model.get('currPlaceInArr')+1);
      }
    };

  },

  setupPrevPost: function() {
    if (this.model.get('currPlaceInArr') == 0) {
      this.prevModel = BB.collections.posts.last();
    } else {
      this.prevModel = BB.collections.posts.at(this.model.get('currPlaceInArr')-1);
    }

    this.prevModel.set('position_order', 'previous')
  },

  setupNextPost: function() {
    if (this.model.get('currPlaceInArr') == BB.collections.posts.models.length-1) {
      this.nextModel = BB.collections.posts.models[0];
    } else
      this.nextModel = BB.collections.posts.at(this.model.get('currPlaceInArr')+1)
    
    this.nextModel.set('position_order', 'next')
  },

  filterPosts: function() {
    console.log('filterPosts')
    this.grabIdFromURL();
    // this.permaCollection.each(this.findPlaceinArr, this);
    
    for (var i = 0; i < BB.collections.posts.models.length; i++) {
      this.findPlaceinArr(BB.collections.posts.models[i])
    };

    this.setupPrevPost();
    this.setupNextPost();
    Backbone.pubSub.trigger('posts_found');
  },

  grabIdFromURL: function() {
    var url = window.location.href;
    var secondPart = url.split('#!/post/')[1];
    this.model.set('currId', secondPart.split('/')[0]);
  },

  findPlaceinArr: function(mod) {
    if (this.model.get('currId') == mod.get('id')) {
      this.model.set('currPlaceInArr', BB.collections.posts.models.indexOf(mod));
      
      // Backbone.pubSub.trigger('current_model_found');
    };

  },

  createPages: function() {
    var currModel = BB.collections.posts.at(this.model.get('currPlaceInArr'));
    currModel.set('position_order', 'current')

    var permalinkContentPrevView = new PermalinkContentView({model: this.prevModel});
    permalinkContentPrevView.attachTo('.permalink_content');

    var permalinkContentView = new PermalinkContentView({model: currModel});
    permalinkContentView.attachTo('.permalink_content');

    var permalinkContentNextView = new PermalinkContentView({model: this.nextModel});
    permalinkContentNextView.attachTo('.permalink_content');

    this.model.get('views').push(permalinkContentPrevView)
    this.model.get('views').push(permalinkContentView)
    this.model.get('views').push(permalinkContentNextView)
  },

  garbageCollect: function(direction, viewToAdd) {
    var viewArr = this.model.get('views');

    if (direction == 'previous') {
      // Add new view to the beginning of array
      viewArr.unshift(viewToAdd);

      // Dispose of the last view in the array
      var lastView = viewArr[viewArr.length-1];
      lastView.dispose();
      viewArr.pop();

    } else if (direction == 'next') {
      // Add new view to the end of array
      viewArr.push(viewToAdd);

      // Dispose of the first view in the array
      var firstView = viewArr[0];
      firstView.dispose();
      viewArr.shift();

    };

  },

  setHistory: function() {
    var currMod = BB.collections.posts.at(this.model.get('currPlaceInArr'));
    var url = document.domain;
    var id = currMod.get('id');
    var slug = currMod.get('slug');
    var permaUrl = '#!/post/' + id + '/' + slug

    Backbone.history.navigate(permaUrl, {trigger: false});
  },

  navigateHist: function() {
    this.clearAllViews();
    this.filterPosts();
  },

  clearAllViews: function() {
    // When using browser buttons ----------------
    // Dispose and empty all views at once -------
    var viewArr = this.model.get('views');
    for (var i = 0; i < viewArr.length; i++) {
      viewArr[i].dispose();
      viewArr.length = 0;
    };
  },

  dispose: function(arg) {
    this.clearAllViews();
    BaseView.prototype.dispose.apply(this, arguments);
    
  }



});












