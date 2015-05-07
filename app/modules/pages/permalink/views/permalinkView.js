
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
    this.listenTo(Backbone.pubSub, 'perma_collectionRetrieved', this.filterPosts);
    this.listenTo(Backbone.pubSub, 'posts_found', this.createPages);
    this.permaCollection = new SiteCollection([], {tag: 'featured', type: 'perma'});
    
    this.attachTo('.main_container');
  },

  render: function () {
    // console.log('render permalink')
    this.$el.html( this.template( this.model.toJSON()) );

    return this;
  },

  prevPost: function() {
    console.log('this.nextModel',this.nextModel)
    $('.next').remove();
    $('.current').removeClass('current').addClass('next');
    $('.previous').addClass('current').removeClass('previous');

    if (this.model.get('currPlaceInArr') == 0) {
      this.model.set('currPlaceInArr', this.permaCollection.length-1);
    } else {
      this.model.set('currPlaceInArr', this.model.get('currPlaceInArr')-1);
    }

    this.setupPrevPost();
  },

  nextPost: function() {
    $('.previous').remove();
    $('.current').removeClass('current').addClass('previous');
    $('.next').addClass('current').removeClass('next');

    if (this.model.get('currPlaceInArr') == (this.permaCollection.length-1)) {
      this.model.set('currPlaceInArr', 0);
    } else {
      this.model.set('currPlaceInArr', this.model.get('currPlaceInArr')+1);
    }

    this.setupNextPost();
  },

  setupPrevPost: function() {
    if (this.model.get('currPlaceInArr') == 0) {
      this.prevModel = this.permaCollection.last();
    } else {
      this.prevModel = this.permaCollection.at(this.model.get('currPlaceInArr')-1);
    }

    this.prevModel.set('position_order', 'previous')
    var permalinkContentPrevView = new PermalinkContentView({model: this.prevModel});
    permalinkContentPrevView.preAttachTo('.permalink_content');
  },

  setupNextPost: function() {
    if (this.model.get('currPlaceInArr') == this.permaCollection.length-1) {
      this.nextModel = this.permaCollection.at(0);
    } else
      this.nextModel = this.permaCollection.at(this.model.get('currPlaceInArr')+1)
    
    this.nextModel.set('position_order', 'next')
    var permalinkContentNextView = new PermalinkContentView({model: this.nextModel});
    permalinkContentNextView.attachTo('.permalink_content');
  },

  filterPosts: function() {
    this.findId();
    this.permaCollection.each(this.findPlaceinArr, this);
    this.findAdjacentPosts();
  },

  findId: function() {
    var url = window.location.href;
    var secondPart = url.split('/post/')[1];
    this.model.set('currId', secondPart.split('/')[0]);
  },

  findPlaceinArr: function(mod) {
    if (this.model.get('currId') == mod.get('id')) {
      this.model.set('currPlaceInArr', this.permaCollection.indexOf(mod));
      
      // console.log('found it!!!!!',mod, this.currPlaceInArr)
      // Backbone.pubSub.trigger('current_model_found');
    };

  },

  findAdjacentPosts: function() {
    if (this.model.get('currPlaceInArr') == 0) {
      this.prevModel = this.permaCollection.last();
    } else {
      this.prevModel = this.permaCollection.at(this.model.get('currPlaceInArr')-1);
    }
    this.prevModel.set('position_order', 'previous')

    if (this.model.get('currPlaceInArr') == (this.permaCollection.length-1)) {
      this.nextModel = this.permaCollection.first();
    } else {
      this.nextModel = this.permaCollection.at(this.model.get('currPlaceInArr')+1);
    }
    this.nextModel.set('position_order', 'next')

    Backbone.pubSub.trigger('posts_found');
  },

  createPages: function() {
    console.log('createPages')

    var currModel = this.permaCollection.at(this.model.get('currPlaceInArr'));
    currModel.set('position_order', 'current')

    var permalinkContentPrevView = new PermalinkContentView({model: this.prevModel});
    permalinkContentPrevView.attachTo('.permalink_content');

    var permalinkContentView = new PermalinkContentView({model: currModel});
    permalinkContentView.attachTo('.permalink_content');

    var permalinkContentNextView = new PermalinkContentView({model: this.nextModel});
    permalinkContentNextView.attachTo('.permalink_content');
  }



});












