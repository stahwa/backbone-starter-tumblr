"use strict";

var SiteView = require('modules/base/site/views/siteView');
var HomeView = require('modules/pages/home/views/homeView');
var AboutView = require('modules/pages/about/views/aboutView');
var MoreView = require('modules/pages/more/views/moreView');
var PermalinkView = require('modules/pages/permalink/views/permalinkView');

// var SiteModel = require('modules/base/site/models/siteModel');
var HomeModel = require('modules/pages/home/models/homeModel');
var AboutModel = require('modules/pages/about/models/aboutModel');
var MoreModel = require('modules/pages/more/models/moreModel');
var PermalinkModel = require('modules/pages/permalink/models/permalinkModel');


module.exports = Backbone.Router.extend({
  routes: {
    '!/': 'index',
    '!/about': 'about',
    '!/more': 'more',
    '!/post/:id/:slug': 'permalink',

    ":else": "index"
  },

  initialize: function() {
    this.siteView = new SiteView({el: $('#app')});
  },

  index: function() {
    var homeModel = new HomeModel();
    var homeView = new HomeView({model: homeModel});
    this.siteView.gotoView(homeView);
    BB.currPage = 'index';
  },

  about: function() {
    var aboutModel = new AboutModel();
    var aboutView = new AboutView({model: aboutModel});
    this.siteView.gotoView(aboutView);
    BB.currPage = 'about';
  },

  more: function() {
    var moreModel = new MoreModel();
    var moreView = new MoreView({model: moreModel});
    this.siteView.gotoView(moreView);
    BB.currPage = 'more';
  },

  permalink: function() {
    console.log('permalink router')
    if (BB.currPage != 'permalink') {
      var permalinkModel = new PermalinkModel();
      this.permalinkView = new PermalinkView({model: permalinkModel});
      this.siteView.gotoView(this.permalinkView);
      BB.currPage = 'permalink';
      // console.log('permalinkView1',this.permalinkView)
    } else {
      // console.log('permalinkView2',this.permalinkView)
      console.log('browser button')

      this.permalinkView.navigateHist();
      // console.log('back history', Backbone.history)

    }
    
  }


});

