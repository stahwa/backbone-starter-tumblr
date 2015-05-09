
'use strict';

var BaseView = require('base/baseView');
var SocialShare = require('modules/base/components/socialShare/views/socialShareView');
var SocialTumblr = require('modules/base/components/socialShare/views/socialTumblrView');


module.exports = BaseView.extend({

  tagName: 'div',
  className: function() {
    return 'perma_post ' + this.model.get('position_order')
  },
  template: require('../templates/permalinkContent.hbs'),
  events: {
    'click .cover_copy': 'zoom'
  },

  initialize: function () {
    // this.permaCollection = new SiteCollection([], {tag: 'featured', type: 'perma'});
    // console.log('this.model',this.model)
    // this.attachTo('.permalink_content');
    
  },

  zoom: function() {
    console.log('zoom')
    $('.cover_copy').addClass('zoom')
  },

  render: function () {
    // console.log('render permalink')
    this.$el.html( this.template( this.model.toJSON() ));

    var socialTumblr = new SocialTumblr({model: this.model});
    socialTumblr.attachTo('.perma_wrap', this.$el);
    // this.$el.find('.perma_wrap').append(socialTumblr)

    var socialShare = new SocialShare({model: this.model});
    socialShare.attachTo('.perma_wrap', this.$el);
    // this.$el.find('.perma_wrap').append(socialShare)

    return this;
  }

  



});

