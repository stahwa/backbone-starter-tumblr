'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

  className: 'post_item_container',
  template: require('../templates/postItem.hbs'),
  events: {
    'mouseenter': 'sizeCopyContainer',
    'click': 'gotoPerma'
  },

  initialize: function() {
    // console.log('this.model',this.model)
    this.$el.html(this.template( this.model.toJSON()));
  },

  sizeCopyContainer: function(e) {
    var copyH = $(e.currentTarget).find('.copy_container').innerHeight();
    $(e.currentTarget).find('.copy_content').css('height', copyH)
  },

  render: function() {
  	// this.$el.html(this.template( this.model.toJSON()));
    return this;
  },

  gotoPerma: function() {
    var currId = this.model.get('id');
    var url = document.domain;
    var permaUrl = '#post/' +currId+ '/' +this.model.get('slug');
    console.log('gotoPerma',permaUrl);
    window.location = permaUrl;

    // Backbone.history.navigate(permaUrl, true);
  }


});
