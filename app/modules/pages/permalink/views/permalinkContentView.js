
'use strict';

var BaseView = require('base/baseView');
var SocialShare = require('modules/base/components/socialShare/views/socialShareView');
var SocialTumblr = require('modules/base/components/socialShare/views/socialTumblrView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: 'perma_wrap',
  template: require('../templates/permalinkContent.hbs'),
  events: {},

  initialize: function () {
    // this.permaCollection = new SiteCollection([], {tag: 'featured', type: 'perma'});
    // console.log('this.model',this.model.toJSON())
    this.attachTo('.permalink_content');

    var socialTumblr = new SocialTumblr({model: this.model});
    socialTumblr.attachTo('.perma_wrap');
    var socialShare = new SocialShare({model: this.model});
    socialShare.attachTo('.perma_wrap');

  },

  render: function () {
    console.log('render permalink')
    this.$el.html( this.template( this.model.toJSON() ));

    return this;
  }

  



});

