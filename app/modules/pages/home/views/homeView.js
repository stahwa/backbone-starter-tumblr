
'use strict';

var BaseView = require('base/baseView');
var CarouselView = require('modules/base/components/carousel/views/carouselView');
var BarView = require('modules/base/components/bar/views/barView');
var PostsView = require('modules/base/components/posts/views/postsView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'home_container main_comp',
  attributes: {'data-page': 'home'},
  template: require('../templates/home.hbs'),
  events: {
    'click .home_title': 'clickHandler'
  },

  initialize: function() {
    // this.listenTo(Backbone.pubSub, 'collectionDone', this.render);
    this.listenTo(this.model, 'change', this.render);
    this.attachTo('.main_container');

    this.buildPage();
  },

  buildPage: function() {
    this.carouselView = new CarouselView({el: $('.carousel_container')});
    this.barView = new BarView({el: $('.bar_container')});
    this.postsView = new PostsView({el: $('.posts_container')});
  },

  render: function() {
    // this.$el.html( this.template({collection: this.coverCollection.toJSON()}) );
    this.$el.html( this.template() );

    // Backbone.pubSub.trigger('viewRendered', 'helloooo payload');
    return this;
  },

  attachTo: function(arg) {
    BaseView.prototype.attachTo.apply(this, arguments);
  },

  clickHandler: function() {
    this.model.set({title: 'changed title'})
  },

  dispose: function(arg) {
    this.carouselView.dispose();
    this.barView.dispose();
    this.postsView.dispose();
    BaseView.prototype.dispose.apply(this, arguments);
    
  }

});

