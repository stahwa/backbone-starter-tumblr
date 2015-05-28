
'use strict';

module.exports = Backbone.Model.extend({

  defaults: {
  	page: 'scroll',
    title: 'Scroll data from model',
    currSection: 'sectionone',
    sections: {
      section_1: {
        secName: 'sectionone'
      },
      section_2: {
        secName: 'sectiontwo'
      },
      section_3: {
        secName: 'sectionthree'
      }
    }
    
  }

});

