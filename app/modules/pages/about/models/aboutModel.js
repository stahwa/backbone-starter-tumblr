
'use strict';

module.exports = Backbone.Model.extend({

  defaults: {
  	page: 'about',
    title: 'About data from model',
    currSection: 'section1',
    section1: {
    	title: 'About section 1'
    },
    section2: {
    	title: 'About section 2'
    },
    section3: {
      title: 'About section 3'
    }
  }

});

