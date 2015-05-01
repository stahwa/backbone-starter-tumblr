'use strict';

// var SiteModel = require('modules/base/site/models/siteModel');


module.exports = Backbone.View.extend({

  template: require('../templates/nav.hbs'),
  events: {
    'click li a': 'debounce'
  },

  initialize: function() {
    this.$el.html( this.template );
    this.render();
  },

  render: function() {
    return this;
  },

  debounce: function(e) {
  	if (BB.site.get('isTransitioning') == true) {
  		e.preventDefault();
  	}
  }


});
