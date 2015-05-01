
'use strict';


module.exports = Backbone.View.extend({


	attachTo: function(elem) {
    $(elem).append(this.$el)
    this.render();
  },

  dispose: function() {
    this.remove();
    this.unbind();
    if (this.model) {
    	// console.log('has a model so will unbind')
    	this.model.unbind('change');
    };
  }

});

