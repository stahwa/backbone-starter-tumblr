
'use strict';

var BaseView = require('base/baseView');
var TransEnd = require('util/transEnd');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'section_content',
  template: require('../templates/scrollSection1.hbs'),
  events: {},

  initialize: function (options) {
    // this.options = options;
    this.attachTo('.scroll_section.sectionone');
    this.$el.html(this.template( this.model.toJSON()));
    this.setUp(options.dir);
  },

  render: function () {
    // this.$el.html(this.template( this.model.toJSON()));

    return this;
  },

  setUp: function(startingDir) {
    var startingPos;

    if (startingDir == 'animUp') {
      startingPos = 'below';
    } else if (startingDir == 'animDown') {
      startingPos = 'above';
    } else {
      startingPos = 'center';
    }

    this.$el.addClass(startingPos);
  },

  animIn:function() {
    var _this = this;
    setTimeout(function(){
      _this.$el.addClass('center');
      _this.$el.removeClass('above below')
    }, 0);
  },

  animOut: function(animDir) {
    this.listenToOnce(Backbone.pubSub, 'sectionAnimEnd', this.animEnd);

    this.$el.removeClass('above below center')
    this.$el.addClass(animDir);

    var transitionEvent = TransEnd.whichTransitionEvent();

    this.$el.one(transitionEvent, function(event) {
      Backbone.pubSub.trigger('sectionAnimEnd');
    });

  },

  animEnd: function() {
    console.log('scrollSection1 animation DONE')
    this.dispose();
  }
  
});

