'use strict';

var BaseView = require('base/baseView');
var HeaderView = require('modules/base/header/views/headerView');
var FooterView = require('modules/base/footer/views/footerView');
var LayoutController = require('modules/base/layout/layoutController');
var SiteCollection = require('modules/base/site/collections/siteCollection');


module.exports = BaseView.extend({

  template: require('../templates/site.hbs'),


  initialize: function() {
    var _this = this;

    setTimeout(function(){ _this.resizeMain(); }, 100);
    $(window).on("resize", this.resizeMain);

    this.$el.html( this.template );
    var headerView = new HeaderView({el: $('.header_container')});
    // var footerView = new FooterView({el: $('.footer_container')});
    var postsCollection = new SiteCollection([], {tag: 'featured', type: 'posts', limit: 20});

    this.layout = new LayoutController();

  },

  render: function() {
    // this.$el.html(this.template({ posts: this.collection.toJSON() }));
    
  },

  gotoView: function(view) {
    // $('#app').addClass('fade_view');
    $('#app').addClass('slide_view');
    
    this.layout.slideView(view)
  },

  resizeMain: function() {
    var wh = $(window).height();
    var mainCompH = $('.main_comp').height();
    var app = $('#app');

    app.height(wh-50)
    
  }


});
