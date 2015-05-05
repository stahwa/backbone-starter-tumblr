
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
  events: {},

  initialize: function () {
    this.listenTo(Backbone.pubSub, 'perma_collectionRetrieved', this.filterPosts);
    this.listenTo(Backbone.pubSub, 'current_model_found', this.createPage);
    this.permaCollection = new SiteCollection([], {tag: 'featured', type: 'perma'});
    
    this.attachTo('.main_container');
  },

  render: function () {
    // console.log('render permalink')
    this.$el.html( this.template( this.model.toJSON()) );

    return this;
  },

  filterPosts: function() {
    this.findId();
    console.log('this.permaCollection',this.permaCollection)
    this.permaCollection.each(this.findPlaceinArr, this);
  },

  findId: function() {
    var url = window.location.href;
    var secondPart = url.split('/post/')[1];
    this.currId = secondPart.split('/')[0];
    console.log('this.currId',this.currId)
    // this.filterPosts();
  },

  findPlaceinArr: function(mod) {
    console.log('filterPosts', mod.get('id'))
    if (this.currId == mod.get('id')) {
      this.placeInArr = this.permaCollection.indexOf(mod);
      
      console.log('found it!!!!!',mod, this.placeInArr)
      Backbone.pubSub.trigger('current_model_found');
    };
  },

  createPage: function() {
    console.log('createPage', this.permaCollection.models[this.placeInArr])
    var currModel = this.permaCollection.models[this.placeInArr];
    var permalinkContentView = new PermalinkContentView({model: currModel});
  }



});

