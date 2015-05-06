'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

	className: 'social_tumblr_component',
  template: require('../templates/socialTumblr.hbs'),
  events: {
  	'mouseenter .social_tumblr_item': 'socialHover',
  	'mouseleave .social_tumblr_item': 'socialUnHover',
    'click .social_tumblr_item .like_button': 'getIdsForLike',
    'click .social_tumblr_item .fa-heart': 'like'
  },

  initialize: function() {
    this.$el.html( this.template( this.model.toJSON() ));
    // this.render();
  },

  render: function() {
  	// this.$el.html( this.template );
    console.log('tumblr this.model',this.model.toJSON())
    this.getIdsForLike();
    return this;
  },

  socialHover: function(e) {
  	$(e.currentTarget).addClass('hover');
  },

  socialUnHover: function(e) {
  	$(e.currentTarget).removeClass('hover');
  },

  like: function() {
    console.log('like clicked')
  },

  getIdsForLike: function() {
    // var newElemIds = [];
    // for var post in @gridPosts
    //   var id = post.id
    //   newElemIds.push(id)
    // Tumblr.LikeButton.get_status_by_post_ids(newElemIds)

    console.log('like  this.model',this.model);
    var newElemIds = [];
    newElemIds.push(this.model.get('id'));
    console.log('newElemIds',newElemIds)
    Tumblr.LikeButton.get_status_by_post_ids(newElemIds);
  }
    



});
