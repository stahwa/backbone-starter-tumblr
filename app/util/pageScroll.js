"use strict";

var lastAnimation = 0,
    quietPeriod = 1000,
    animationTime = 500,
    sectionArr = null


var pageScroll = {

  init: function(sections, currentSection) {
    sectionArr = sections;
    this.setUp(sections);
    this.setPage(currentSection);

  },

  setUp: function(sections) {
    var topPos = 0;

    $.each( $(sections), function(i) {
      $(this).css({
        position: "absolute",
        top: topPos + "%"
      }).attr("data-index", i+1);

      topPos = topPos + 100;
    });
  },

  setPage: function(sec) {
    var indx = sec.substr(sec.length - 1);
    var pos = ((indx-1) * 100) * -1;

    $(sectionArr).removeClass('active')
    $('.about_sec'+indx).addClass('active')
    this.transformPage(pos, indx);
  },

  init_scroll: function(e) {
    e.preventDefault();
    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    var timeNow = new Date().getTime();

    if (timeNow - lastAnimation < quietPeriod + animationTime) {
      return;
    }

    if (delta < 0) {
      this.moveNext();
    } else {
      this.movePrev();
    }

    lastAnimation = timeNow;
  },

  moveNext: function() {
    console.log('moveNext')
    var index = $(sectionArr + ".active").data("index");
    var current = $(sectionArr + "[data-index='" + index + "']");
    var next = $(sectionArr + "[data-index='" + (index + 1) + "']");

    if (next.length < 1) {
      return
    } else {
      var pos = (index * 100) * -1;
    }
    current.removeClass('active')
    next.addClass('active');

    this.transformPage(pos, next.data('index'));
    this.setHistory();
  },

  movePrev: function() {
    console.log('movePrev')
    var index = $(sectionArr +".active").data("index");
    var current = $(sectionArr + "[data-index='" + index + "']");
    var next = $(sectionArr + "[data-index='" + (index - 1) + "']");

    if(next.length < 1) {
      return
    } else {
      var pos = ((next.data('index') - 1) * 100) * -1;
    }
    current.removeClass('active')
    next.addClass('active')

    this.transformPage(pos, next.data('index'));
    this.setHistory();
  },

  transformPage: function( pos, index) {
    $(sectionArr).parent().css({
      '-webkit-transform': 'translate3d(0, ' + pos + '%, 0)',
      '-moz-transform': 'translate3d(0, ' + pos + '%, 0)',
      '-ms-transform': 'translate3d(0, ' + pos + '%, 0)',
      'transform': 'translate3d(0, ' + pos + '%, 0)'
    });
  },

  setHistory: function() {
    var page = BB.currPage;
    var pageSectionUrl = '#!/' + page + '/section' + $('.active').data('index');

    Backbone.history.navigate(pageSectionUrl, {trigger: false});
  }

    


  

};


module.exports = pageScroll;
