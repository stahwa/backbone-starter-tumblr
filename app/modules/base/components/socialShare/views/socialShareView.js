'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

	className: 'social_share_component',
  template: require('../templates/socialShare.hbs'),
  events: {
  	'mouseenter .social_item': 'socialHover',
  	'mouseleave .social_item': 'socialUnHover',
  	'click .social_item .fa-facebook': 'shareFb',
  	'click .social_item .fa-twitter': 'shareTw'
  },

  initialize: function() {
    this.$el.html( this.template );
    this.render();
  },

  render: function() {
  	// this.$el.html( this.template );
    return this;
  },

  socialHover: function(e) {
  	$(e.currentTarget).addClass('hover');
  },

  socialUnHover: function(e) {
  	$(e.currentTarget).removeClass('hover');
  },

  shareFb: function() {
    FB.ui({
      method: 'feed',
      link: this.model.get('post_url'),
      picture: this.model.get('photos')[0].alt_sizes[0].url,
      caption: 'An example caption',
      description: 'An example description',
    }, function(response){});
  },

  shareTw: function() {
  	var url = 'https://twitter.com/intent/tweet?url='+this.model.get('post_url')+'&amp;text=Text%20and%20copy.';

    var popupW = 800
    var popupH = 500
    var screenW = screen.width
    var screenH = screen.height
    var top = (screenH/2)-(popupH/2)
    var left = (screenW/2)-(popupW/2)

    window.open(url, '_blank', 'width='+popupW+'px, height='+popupH+'px, top='+top+'px, left='+left+'px');
  }


});
