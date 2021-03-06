
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'about_section sec3',
  template: require('../templates/aboutSection3.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.about_container .section_wrap');
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON()));
    // console.log('about view render')
    // Backbone.pubSub.trigger('viewRendered', 'helloooo payload');

    return this;
  }
  
});

