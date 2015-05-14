'use strict';

var BaseView = require('base/baseView');
var HeaderView = require('modules/base/header/views/headerView');
var FooterView = require('modules/base/footer/views/footerView');
var LayoutController = require('modules/base/layout/layoutController');


module.exports = BaseView.extend({

  template: require('../templates/site.hbs'),


  initialize: function() {
    var _this = this;

    // siteCollection.fetch({
    //   data: $.param({ tag: 'animals'}),
    //   'success': function (collection, response) {
    //     console.log('API success', collection);
    //     console.log('API success', response);
    //   },
    //   'error': function (collection, response) {
    //     console.log('API error')
    //   }
    // });

    setTimeout(function(){ _this.resizeMain(); }, 100);
    $(window).on("resize", this.resizeMain);

    this.$el.html( this.template );
    var headerView = new HeaderView({el: $('.header_container')});
    // var footerView = new FooterView({el: $('.footer_container')});
    this.layout = new LayoutController();
  },

  render: function() {
    console.log('API success',this.collection)
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
