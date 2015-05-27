
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'section_content',
  template: require('../templates/scrollSection2.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.scroll_section.sectiontwo');
    this.$el.html(this.template( this.model.toJSON()));
  },

  render: function () {
    // this.$el.html(this.template( this.model.toJSON()));

    return this;
  }
  
});

