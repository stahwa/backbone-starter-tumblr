
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'about_container main_comp',
  attributes: {
    'data-page': 'about'
  },
  template: require('../templates/about.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.main_container');
  },

  render: function () {
    this.$el.html(this.template( this.model.toJSON()));
    // console.log('about view render')
    // Backbone.pubSub.trigger('viewRendered', 'helloooo payload');

    return this;
  }
  
});

