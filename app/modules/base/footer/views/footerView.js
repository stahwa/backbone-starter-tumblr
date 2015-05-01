'use strict';


module.exports = Backbone.View.extend({

  template: require('../templates/footer.hbs'),

  initialize: function() {
    this.$el.html( this.template );
    this.render();
  },

  render: function() {
    return this;
  },


});
