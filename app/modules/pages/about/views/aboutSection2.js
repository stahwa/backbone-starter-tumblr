
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'about_section about_sec2',
  template: require('../templates/aboutSection2.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.section_wrap');
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON()));

    return this;
  }
  
});

