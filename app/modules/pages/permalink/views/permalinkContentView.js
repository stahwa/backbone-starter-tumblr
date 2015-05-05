
'use strict';

var BaseView = require('base/baseView');
// var SiteCollection = require('modules/base/site/collections/siteCollection');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'perma_wrap',
  template: require('../templates/permalinkContent.hbs'),
  events: {},

  initialize: function () {
    // this.permaCollection = new SiteCollection([], {tag: 'featured', type: 'perma'});
    console.log('this.model',this.model.toJSON())
    this.attachTo('.permalink_content');
  },

  render: function () {
    // console.log('render permalink')
    this.$el.html( this.template( this.model.toJSON() ));

    return this;
  }



});

