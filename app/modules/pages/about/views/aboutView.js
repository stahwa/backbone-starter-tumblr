'use strict';

var BaseView = require('base/baseView');
var PageScroll = require('util/pageScroll');
var SwipeEvents = require('util/SwipeEvents');
var AboutSection1 = require('modules/pages/about/views/aboutSection1');
var AboutSection2 = require('modules/pages/about/views/aboutSection2');
var AboutSection3 = require('modules/pages/about/views/aboutSection3');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'about_container main_comp',
  attributes: {
    'data-page': 'about'
  },
  template: require('../templates/about.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.main_container');
    this.checkForSection();
    this.buildPage();
    this.bindEvents();

    PageScroll.init('.about_section', this.model.get('currSection'));
  },

  bindEvents: function() {
    this.$el.on('mousewheel DOMMouseScroll MozMousePixelScroll', function(e) {
      PageScroll.init_scroll(e);
    });

    this.$el.swipeEvents().on('swipeUp',  function(){ PageScroll.moveNext(); })
      .on('swipeDown',  function(){ PageScroll.movePrev(); });
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON()));
    return this;
  },

  checkForSection: function() {
    var url = window.location.href;
    var page = BB.currPage;
    var secondPart = url.split('#!/' + page + '/')[1];
    if (secondPart) {
      this.model.set('currSection', secondPart);
    } else {
      this.model.set('currSection', 'section1');
    }
  },

  buildPage: function() {
    this.aboutSection1 = new AboutSection1({model: this.model});
    this.aboutSection2 = new AboutSection2({model: this.model});
    this.aboutSection3 = new AboutSection3({model: this.model});
  },

  navigateHist: function() {
    this.checkForSection();
    PageScroll.setPage(this.model.get('currSection'));
  },

  dispose: function(arg) {
    console.log('about dispose')
    
    // this.$el.off('mousewheel DOMMouseScroll MozMousePixelScroll');
    // this.$el.swipeEvents().off('swipeUp')
    //   .off('swipeDown');

    this.aboutSection1.dispose();
    this.aboutSection2.dispose();
    this.aboutSection3.dispose();

    BaseView.prototype.dispose.apply(this, arguments);
    
  }
  
});

