
var Router = require('./router');
var router = new Router();
var SiteModel = require('modules/base/site/models/siteModel');

BB = window.BB || {};
BB = {
  models: {},
  collections: {},
  views: {},
  routers: router,
  currPage: '',
  init: function() {
  	this.site = new SiteModel();
    Backbone.history.start({
    	// pushState: true,
    	// root: '/'
    });
  }
};

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