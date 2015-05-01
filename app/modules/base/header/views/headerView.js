'use strict';

var NavView = require('modules/base/nav/views/navView');


module.exports = Backbone.View.extend({

  template: require('../templates/header.hbs'),

  initialize: function() {
    this.$el.html( this.template );
    var navView = new NavView({el: $('.inner_header')});
    this.render();
  },

  render: function() {
    return this;
  },


});
