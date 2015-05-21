
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'scroll_section sec1',
  template: require('../templates/scrollSection1.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.scroll_container .section_wrap');
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON()));

    return this;
  }
  
});

