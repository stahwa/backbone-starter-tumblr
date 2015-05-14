'use strict';

var BaseView = require('base/baseView');
var PageScroll = require('util/pageScroll');
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
    var aboutSection1 = new AboutSection1({model: this.model});
    var aboutSection2 = new AboutSection2({model: this.model});
    var aboutSection3 = new AboutSection3({model: this.model});
  },

  navigateHist: function() {
    this.checkForSection();
    PageScroll.setPage(this.model.get('currSection'));
  },

  dispose: function(arg) {
    this.$el.off('mousewheel DOMMouseScroll MozMousePixelScroll');
    BaseView.prototype.dispose.apply(this, arguments);
    
  }
  
});

