'use strict';

var SiteCollection = require('modules/base/site/collections/siteCollection');


module.exports = Backbone.View.extend({

  template: require('../templates/carousel.hbs'),

  initialize: function() {
  	this.listenTo(Backbone.pubSub, 'carousel_collectionRetrieved', this.render);
    // this.$el.html( this.template );
    this.getImages();
    this.render();
  },

  getImages: function() {
  	this.coverCollection = new SiteCollection([], {tag: 'cover', type: 'carousel'});
  },

  render: function() {
  	this.$el.html( this.template({collection: this.coverCollection.toJSON()}) );
    return this;
  }


});
