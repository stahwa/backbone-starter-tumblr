
var Router = require('./router');
var router = new Router();
var SiteModel = require('modules/base/site/models/siteModel');

BB = window.BB || {};
BB = {
  models: {},
  collections: {},
  views: {},
  routers: router,
  init: function() {
  	this.site = new SiteModel();
    Backbone.history.start();
  }
};

// create pub-sub functionality
Backbone.pubSub = _.extend({}, Backbone.Events);

$(document).ready(function () {
	BB.init();
});
