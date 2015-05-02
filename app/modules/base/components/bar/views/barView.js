'use strict';


module.exports = Backbone.View.extend({

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
