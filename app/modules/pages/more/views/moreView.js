
'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'more_container main_comp',
  attributes: {
    'data-page': 'more'
  },
  template: require('../templates/more.hbs'),
  events: {},

  initialize: function () {
    this.attachTo('.main_container');
  },

  render: function () {
    this.$el.html( this.template( this.model.toJSON()) );
    // console.log('more view render')
    // Backbone.pubSub.trigger('viewRendered', 'helloooo payload');
    return this;
  }

});

