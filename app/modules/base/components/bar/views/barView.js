'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  template: require('../templates/bar.hbs'),

  initialize: function() {
    this.$el.html( this.template );
    this.render();
  },

  render: function() {
  	// this.$el.html( this.template );
    return this;
  }


});
