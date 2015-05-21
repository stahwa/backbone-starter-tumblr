'use strict';

var BaseView = require('base/baseView');
var PageScroll = require('util/pageScroll');
var SwipeEvents = require('util/SwipeEvents');
var ScrollSection1 = require('modules/pages/scroll/views/scrollSection1');
var ScrollSection2 = require('modules/pages/scroll/views/scrollSection2');
var ScrollSection3 = require('modules/pages/scroll/views/scrollSection3');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'scroll_container main_comp',
  attributes: {
    'data-page': 'scroll'
  },
  template: require('../templates/scroll.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.main_container');
    this.checkForSection();
    this.buildPage();
    this.bindEvents();

    PageScroll.init('.scroll_section', this.model.get('currSection'));
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
    this.scrollSection1 = new ScrollSection1({model: this.model});
    this.scrollSection2 = new ScrollSection2({model: this.model});
    this.scrollSection3 = new ScrollSection3({model: this.model});
  },

  navigateHist: function() {
    this.checkForSection();
    PageScroll.setPage(this.model.get('currSection'));
  },

  dispose: function(arg) {
    console.log('scroll dispose')
    
    // this.$el.off('mousewheel DOMMouseScroll MozMousePixelScroll');
    // this.$el.swipeEvents().off('swipeUp')
    //   .off('swipeDown');

    this.scrollSection1.dispose();
    this.scrollSection2.dispose();
    this.scrollSection3.dispose();

    BaseView.prototype.dispose.apply(this, arguments);
    
  }
  
});

