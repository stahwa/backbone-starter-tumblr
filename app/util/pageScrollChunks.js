"use strict";

var lastAnimation = 0,
    quietPeriod = 1000,
    animationTime = 500,
    sectionArr = [],
    currIndex = 1


var pageScrollChunks = {

  init: function(sections, currentSection) {
    sectionArr = sections;
    this.setUp(sections);
    this.setPage(currentSection);
  },

  setUp: function(sections) {
    var topPos = 0;

    $.each( $(sections), function(i) {
      $(this).attr('data-index', i+1);
    });
  },

  setPage: function(sec) {

    // var indx = sec.substr(sec.length - 1);
    var currSectionEl = document.getElementsByClassName(sec)[0];
    var indx = parseInt(currSectionEl.getAttribute('data-index'));
    var pos = ((indx-1) * 100) * -1;

    $(sectionArr).removeClass('active')
    $(currSectionEl).addClass('active')

    currIndex = indx;
  },

  init_scroll: function(e) {
    e.preventDefault();
    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    var timeNow = new Date().getTime();

    if (timeNow - lastAnimation < quietPeriod + animationTime) {
      return;
    }

    if (delta < 0) {
      this.loadNextSection();
    } else {
      this.loadPrevSection();
    }

    lastAnimation = timeNow;
  },

  loadNextSection: function() {
    var current = $(sectionArr + "[data-index='" + currIndex + "']");
    var next = $(sectionArr + "[data-index='" + (currIndex+1) + "']");

    if (next.length < 1) {
      return
    } else {

      current.removeClass('active')
      next.addClass('active');

      Backbone.pubSub.trigger('loadScrollSection', (currIndex+1));
      currIndex = currIndex + 1;
    }
  },

  loadPrevSection: function() {
    var current = $(sectionArr + "[data-index='" + currIndex + "']");
    var next = $(sectionArr + "[data-index='" + (currIndex-1) + "']");

    if (next.length < 1) {
      return
    } else {
      
      current.removeClass('active')
      next.addClass('active')

      Backbone.pubSub.trigger('loadScrollSection', (currIndex-1));
      currIndex = currIndex - 1;
    }
  },

  // moveNext: function() {
  //   var index = $(sectionArr + ".active").data("index");
  //   var current = $(sectionArr + "[data-index='" + index + "']");
  //   var next = $(sectionArr + "[data-index='" + (index + 1) + "']");

  //   if (next.length < 1) {
  //     return
  //   } else {
  //     var pos = (index * 100) * -1;
  //   }
  //   current.removeClass('active')
  //   next.addClass('active');

  //   this.transformPage(pos, next.data('index'));
  //   this.setHistory();
  // },

  // movePrev: function() {
  //   var index = $(sectionArr +".active").data("index");
  //   var current = $(sectionArr + "[data-index='" + index + "']");
  //   var next = $(sectionArr + "[data-index='" + (index - 1) + "']");

  //   if(next.length < 1) {
  //     return
  //   } else {
  //     var pos = ((next.data('index') - 1) * 100) * -1;
  //   }
  //   current.removeClass('active')
  //   next.addClass('active')

  //   this.transformPage(pos, next.data('index'));
  //   this.setHistory();
  // },

  // transformPage: function( pos, index) {
  //   $(sectionArr).parent().css({
  //     '-webkit-transform': 'translate3d(0, ' + pos + '%, 0)',
  //     '-moz-transform': 'translate3d(0, ' + pos + '%, 0)',
  //     '-ms-transform': 'translate3d(0, ' + pos + '%, 0)',
  //     'transform': 'translate3d(0, ' + pos + '%, 0)'
  //   });
  // }

  // setHistory: function() {
  //   var page = BB.currPage;
  //   var pageSectionUrl = '#!/' + page + '/section' + $('.active').data('index');
  //   // var pageSectionUrl = '#!/' + page + '/' + currSection

  //   Backbone.history.navigate(pageSectionUrl, {trigger: false});
  // }

    


  

};


module.exports = pageScrollChunks;
