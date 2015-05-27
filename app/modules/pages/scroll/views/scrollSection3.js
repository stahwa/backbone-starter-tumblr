
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'section_content',
  template: require('../templates/scrollSection3.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.scroll_section.sectionthree');
    this.$el.html(this.template( this.model.toJSON()));
  },

  render: function () {
    // this.$el.html(this.template( this.model.toJSON()));

    return this;
  }
  
});

