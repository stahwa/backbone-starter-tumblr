
'use strict';

var BaseView = require('base/baseView');
var SiteCollection = require('modules/base/site/collections/siteCollection');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'permalink_container main_comp',
  attributes: {
    'data-page': 'permalink'
  },
  template: require('../templates/permalink.hbs'),
  events: {},

  initialize: function () {
    console.log('perma init')
    this.listenTo(Backbone.pubSub, 'perma_collectionRetrieved', this.findPost);
    this.permaCollection = new SiteCollection([], {tag: 'featured', type: 'perma'});
    
    this.attachTo('.main_container');
  },

  render: function () {
    // console.log('render permalink')
    this.$el.html( this.template( this.model.toJSON()) );

    return this;
  },

  findPost: function() {
    var url = window.location.href;
    var secondPart = url.split('/post/')[1];
    this.currId = secondPart.split('/')[0];
    console.log('this.currId',this.currId)
    this.filterPosts();
  },

  filterPosts: function() {
    console.log('this.permaCollection',this.permaCollection)
    this.permaCollection.each(this.findPlaceinArr, this);
  },

  findPlaceinArr: function(mod) {
    console.log('filterPosts', mod.get('id'))
    if (this.currId == mod.get('id')) {
      var placeInArr = this.permaCollection.indexOf(mod);
      console.log('found it!!!!!',mod, placeInArr)
    };
  }



});

