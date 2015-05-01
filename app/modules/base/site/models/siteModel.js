'use strict';


var SiteModel = Backbone.Model.extend({

  defaults: {
    title: 'Site data from model'
  },

  initialize: function() {
  	// console.log('SiteModel initialized')
  	// this.on('change:isTransitioning', function(){
   //      console.log('isTransitioning Values for this model have changed.', this.get('isTransitioning'));
   //  });
  }
 
});

module.exports = SiteModel;