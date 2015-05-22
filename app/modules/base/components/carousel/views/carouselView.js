'use strict';

var BaseView = require('base/baseView');
// var SiteCollection = require('modules/base/site/collections/siteCollection');


module.exports = BaseView.extend({

  template: require('../templates/carousel.hbs'),

  initialize: function() {
    // this.$el.html( this.template );
    // this.render();

  	this.listenTo(Backbone.pubSub, 'carousel_fullCollectionRetrieved', this.createPosts);

    if (BB.collections.carousel) {
      this.createPosts();
    }
    
  },

  createPosts: function() {
    var _this = this;
    var carouselCollection = BB.collections.carousel;
    this.$el.html(this.template( {collection: carouselCollection.toJSON()} ));

    setTimeout(function(){
      _this.initSwiper();
      _this.manageClass();
    }, 0);
    
  },

  initSwiper: function() {
    var _this = this;
    this.mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      speed: 700,
      autoplay: 6000,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination: '.swiper-pagination',
      paginationClickable: true,
      createPagination: true,
      onInit: function() {
        // console.log('swiper initted')
      },
      onSlideChangeStart: function() {
        $('.tempViewable').removeClass('tempViewable');
        $('.carousel_container .swiper-slide').removeClass('next').removeClass('previous')
        _this.manageClass();
      }
    });
  },

  manageClass: function() {
    var prevPlacement, swiperThumbs;
    swiperThumbs = $('.carousel_container .swiper-slide').length;
    prevPlacement = swiperThumbs - 3;
    $('.swiper-slide-active').next().addClass('next');
    $('.swiper-slide-active').prev().addClass('previous');
    if (!($('.carousel_container .swiper-slide').hasClass('next'))) {
      $('.carousel_container .swiper-wrapper').children().eq(2).addClass('next');
      $('.carousel_container .swiper-wrapper').children().eq(1).addClass('tempViewable');
    }
    if (!($('.carousel_container .swiper-slide').hasClass('previous'))) {
      $('.carousel_container .swiper-wrapper').children().eq(prevPlacement).addClass('previous');
      $('.carousel_container .swiper-wrapper').children().eq(prevPlacement + 1).addClass('tempViewable');
    }

  },

  render: function() {
    console.log('carousel render')
  	// this.$el.html( this.template() );
    // this.initSwiper();
    // this.manageClass();
    return this;
  },

  dispose: function(arg) {
    // for (var i = this.coverCollection.models.length - 1; i >= 0; i--) {
    //   this.coverCollection.models[i].unbind('change')
    //   this.coverCollection.models[i] = null;
    // };
    // this.coverCollection = null;
    this.mySwiper = null;
    BaseView.prototype.dispose.apply(this, arguments);
    
  }


});
