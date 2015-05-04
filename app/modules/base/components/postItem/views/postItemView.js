'use strict';

var BaseView = require('base/baseView');
// var SiteCollection = require('modules/base/site/collections/siteCollection');


module.exports = BaseView.extend({

  className: 'post_item_container',
  template: require('../templates/postItem.hbs'),
  events: {
    'mouseenter': 'sizeCopyContainer'
  },

  initialize: function() {
    this.$el.html(this.template( this.model.toJSON()));
  },

  sizeCopyContainer: function(e) {
    var copyH = $(e.currentTarget).find('.copy_container').innerHeight();
    $(e.currentTarget).find('.copy_content').css('height', copyH)
  },

  render: function() {
  	// this.$el.html(this.template( this.model.toJSON()));
    return this;
  }


});
