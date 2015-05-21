
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'scroll_section sec3',
  template: require('../templates/scrollSection3.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.scroll_container .section_wrap');
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON()));
    // console.log('about view render')
    // Backbone.pubSub.trigger('viewRendered', 'helloooo payload');

    return this;
  }
  
});

