
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'section_content',
  template: require('../templates/scrollSection1.hbs'),
  events: {},

  initialize: function () {
    console.log('scrollSection1 init')
    this.attachTo('.scroll_section.sectionone');
    this.$el.html(this.template( this.model.toJSON()));
    // this.render();
  },

  render: function () {
    // this.$el.html(this.template( this.model.toJSON()));

    return this;
  }
  
});

