
'use strict';

module.exports = Backbone.Model.extend({

  defaults: {
  	page: 'scroll',
    title: 'Scroll data from model',
    currSection: 'section1',
    section1: {
    	title: 'Scroll section 1'
    },
    section2: {
    	title: 'Scroll section 2'
    },
    section3: {
      title: 'Scroll section 3'
    }
  }

});

