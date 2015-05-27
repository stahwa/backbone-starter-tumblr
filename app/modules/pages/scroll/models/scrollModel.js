
'use strict';

module.exports = Backbone.Model.extend({

  defaults: {
  	page: 'scroll',
    title: 'Scroll data from model',
    currSection: 'sectionone',
    sectionone: {
    	title: 'Scroll section 1'
    },
    sectiontwo: {
    	title: 'Scroll section 2'
    },
    sectionthree: {
      title: 'Scroll section 3'
    }
  }

});

