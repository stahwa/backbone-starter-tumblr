'use strict';

var BaseView = require('base/baseView');


module.exports = BaseView.extend({

	className: 'preloader_component',
  template: require('../templates/preloader.hbs'),

  initialize: function() {
  	// this.checkLoaded();
    this.$el.html( this.template );
    this.render();
    this.attachTo('.preloader_container');

    this.listenTo(Backbone.pubSub, 'remove_preloader', this.removePreloader);
  },

  render: function() {
  	// this.$el.html( this.template );
    return this;
  },

  checkLoaded: function() {
  	var currLoadedPostAmt = BB.collections._info.posts.currLoadedPostAmt;
    var totalPosts = BB.collections._info.posts.totalPosts;

    console.log('currLoadedPostAmt',currLoadedPostAmt)
    console.log('totalPosts',totalPosts)

    if ((currLoadedPostAmt != undefined) && (totalPosts != undefined)) {
    	if (currLoadedPostAmt == totalPosts) {
    		console.log('checkloaded is loaded')
    		this.removePreloader();
    	}
    	
    }
  },

  removePreloader: function(arg) {
  	var self = this;
    console.log('remove preloader', arg)
    $('.preloader_component').addClass('hide');
    setTimeout(function(){
    	self.dispose();
    }, 2000);
  }


});
