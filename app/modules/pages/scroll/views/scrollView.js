'use strict';

var BaseView = require('base/baseView');
var PageScrollChunks = require('util/pageScrollChunks');
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
    this.listenTo(Backbone.pubSub, 'carousel_fullCollectionRetrieved', this.setupSections);
    this.listenTo(Backbone.pubSub, 'loadScrollSection', this.loadNewSection);

    this.attachTo('.main_container');
    this.checkForSection();
    this.bindEvents();

    if (BB.collections.carousel) {
      this.setupSections();
    }

  },

  bindEvents: function() {
    this.$el.on('mousewheel DOMMouseScroll MozMousePixelScroll', function(e) {
      PageScrollChunks.init_scroll(e);
    });

    this.$el.swipeEvents().on('swipeUp',  function(){ PageScrollChunks.moveNext(); })
      .on('swipeDown',  function(){ PageScrollChunks.movePrev(); });
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
      this.model.set('currSection', 'sectionone');
    }
    // console.log('checkForSection currSection',this.model.get('currSection'))
  },

  setupSections: function() {
    this.buildPage();
    console.log('setupSections', this.model)
    PageScrollChunks.init('.scroll_section', this.model.get('currSection'));
  },

  buildPage: function(animDir) {
    var coverCollection = BB.collections.carousel.models;

    if (this.currentView) {
      BB.site.set({'oldSection': this.currentView});

      BB.site.get('oldSection').animOut(animDir);
      // this.currentView.dispose();
    };

    switch(this.model.get('currSection')) {
      case 'sectionone':
        this.currentView = new ScrollSection1({model: coverCollection[0], dir: animDir});
        BB.site.set({'currSectionIndex': 1});
        break;
      case 'sectiontwo':
        this.currentView = new ScrollSection2({model: coverCollection[1], dir: animDir});
        BB.site.set({'currSectionIndex': 2});
        break;
      case 'sectionthree':
        this.currentView = new ScrollSection3({model: coverCollection[2], dir: animDir});
        BB.site.set({'currSectionIndex': 3});
        break;
      default:
        console.log('the default case')
    }

    BB.site.set({'currSection': this.currentView});
    BB.site.get('currSection').animIn(animDir);

  },

  loadNewSection: function(sec) {
    var newSec;
    var animDir;

    for (name in this.model.get('sections')) {
      if (name.substr(name.length - 1) == sec) {
        newSec = this.model.get('sections')[name].secName;
        this.setHistory(newSec);
      }
    }

    if (sec > BB.site.get('currSectionIndex')) {
      animDir = 'animUp'
    } else {
      animDir = 'animDown'
    }
    
    this.checkForSection();
    this.buildPage(animDir);
  },

  setHistory: function(newSection) {
    var page = BB.currPage;
    var pageSectionUrl = '#!/' + page + '/' + newSection;

    Backbone.history.navigate(pageSectionUrl, {trigger: false});
  },

  navigateHist: function() {
    this.checkForSection();
    PageScrollChunks.setPage(this.model.get('currSection'));
  },

  dispose: function(arg) {
    console.log('scroll dispose')
    if (BB.site.get('oldSection')) {
      BB.site.get('oldSection').dispose();
    };
    
    BB.site.get('currSection').dispose();

    // this.currentView.dispose();
    this.$el.off('mousewheel DOMMouseScroll MozMousePixelScroll');
    this.$el.swipeEvents().off('swipeUp')
      .off('swipeDown');

    // this.section1.dispose();
    // this.section2.dispose();
    // this.section3.dispose();

    BaseView.prototype.dispose.apply(this, arguments);
    
  }
  
});

