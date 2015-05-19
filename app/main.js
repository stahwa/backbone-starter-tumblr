
var Router = require('./router');
var SiteModel = require('modules/base/site/models/siteModel');


BB = window.BB || {};
BB = {
  models: {},
  collections: {
    _info: {}
  },
  views: {},
  routers: router,
  currPage: '',
  init: function() {
  	this.site = new SiteModel({
		  isTransitioning: false
		});
    Backbone.history.start({
    	// pushState: true,
    	// root: '/'
    });
  },
  is_touch: false
};

var router = new Router();

if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
  BB.is_touch = true;
  $('body').addClass('is-touch')
}
  

// create pub-sub functionality
Backbone.pubSub = _.extend({}, Backbone.Events);

$(document).ready(function () {
	BB.init();
});



// ============================================================
// TO REMOVE HASH IN URL ======================================
// ============================================================

// From https://gist.github.com/jabbett/5199231

// $(document).delegate("a", "click", function(evt) {
// 	console.log('in the a capture')

//   var href = $(this).attr("href");
//   var protocol = this.protocol + "//";
 
//   if (href.slice(protocol.length) !== protocol && protocol !== 'javascript://' && href.substring(0, 1) !== '#') {
//     evt.preventDefault();
 
//     Backbone.history.navigate(href, true);
//   }
// });