
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'about_section sec1',
  template: require('../templates/aboutSection1.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.about_container .section_wrap');
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON()));

    return this;
  }
  
});

