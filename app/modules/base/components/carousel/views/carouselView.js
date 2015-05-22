'use strict';

var BaseView = require('base/baseView');
// var SiteCollection = require('modules/base/site/collections/siteCollection');


module.exports = BaseView.extend({

  template: require('../templates/carousel.hbs'),

  initialize: function() {
    // this.$el.html( this.template );
    // this.render();

  	this.listenTo(Backbone.pubSub, 'carousel_fullCollectionRetrieved', this.createPosts);
    
    // this.getPosts();

    if (BB.collections.carousel) {
      console.log('yes carousel exist BBcollection', BB.collections._info.carousel)
      // BB.collections._info.carousel.offset = 0;
      this.createPosts();
    }
    
  },

  getPosts: function() {
  	// this.coverCollection = new SiteCollection([], {tag: 'cover', type: 'carousel', limit: 10});
  },

  createPosts: function() {
    var carouselCollection = BB.collections.carousel;
    this.$el.html(this.template( {collection: carouselCollection.toJSON()} ));

    this.initSwiper();
    this.manageClass();
    // this.render();
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
        // console.log('initted')
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
    // this.mySwiper = null;
    BaseView.prototype.dispose.apply(this, arguments);
    
  }


});
