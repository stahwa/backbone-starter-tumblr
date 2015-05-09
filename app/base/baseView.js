
'use strict';


module.exports = Backbone.View.extend({


	attachTo: function(elem, that) {
    // WTF mate?? ------
    if (that) {
      $(that).find(elem).append(this.$el)
    } else {
      $(elem).append(this.$el)
    }
    
    this.render();
  },

  preAttachTo: function(elem, that) {
    // WTF mate?? ------
    if (that) {
      $(that).find(elem).prepend(this.$el)
    } else {
      $(elem).prepend(this.$el)
    }
    
    this.render();
  },

  dispose: function() {
    this.remove();
    this.unbind();
    
    if (this.model) {
    	// console.log('has a model so will unbind')
    	this.model.unbind('change');
    };

    delete this.$el;
    delete this.el;
  }

});

