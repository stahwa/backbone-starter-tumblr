
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'about_section about_sec1',
  template: require('../templates/aboutSection1.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.section_wrap');
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON()));

    return this;
  }
  
});

