"use strict";

var SiteView = require('modules/base/site/views/siteView');
var HomeView = require('modules/pages/home/views/homeView');
var AboutView = require('modules/pages/about/views/aboutView');
var MoreView = require('modules/pages/more/views/moreView');

var HomeModel = require('modules/pages/home/models/homeModel');
var AboutModel = require('modules/pages/about/models/aboutModel');
var MoreModel = require('modules/pages/more/models/moreModel');


module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "about": "about",
    "more": "more"
  },

  initialize: function() {
    // var siteCollection = new SiteCollection();
    this.siteView = new SiteView({el: $('#app')});
  },

  index: function() {
    var homeModel = new HomeModel();
    var homeView = new HomeView({model: homeModel});
    this.siteView.gotoView(homeView);
  },

  about: function() {
    var aboutModel = new AboutModel();
    var aboutView = new AboutView({model: aboutModel});
    this.siteView.gotoView(aboutView);
  },

  more: function() {
    var moreModel = new MoreModel();
    var moreView = new MoreView({model: moreModel});
    this.siteView.gotoView(moreView);
  }


});

