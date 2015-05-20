'use strict';

var BaseView = require('base/baseView');
var NavState = require('util/navState');
var TransEnd = require('util/transEnd');
// var PreloaderView = require('modules/base/components/preloader/views/preloaderView');


module.exports = BaseView.extend({

  initialize: function() {
    
  },

  showView: function(view) {
    $('#app').addClass('show_view');

    if (this.currentView) {
      this.currentView.dispose();
      console.log('disposing', this.currentView.el)
    }

    this.currentView = view;
    this.currentView.attach(); // Might want to swap render and attached
  },


  slideView: function(view) {
    // var preloaderView = new PreloaderView();
    

    // console.log('BB.site',BB.site)
    if (BB.site.get('currentPage')) {
      BB.site.set({'newPage': view.model.get('page')});
      BB.site.set({'oldPage': BB.site.get('currentPage')});
      BB.site.set({'oldView': BB.site.get('currView')});

      var incomingDirection = NavState.getSlideDir(BB.site.get('currentPage'),BB.site.get('newPage'));
      $('.'+BB.site.get('newPage')+'_container').addClass(incomingDirection);

      this.listenToOnce(Backbone.pubSub, 'animEnd', this.animEnd);
      // this.listenToOnce(Backbone.pubSub, 'viewRendered', this.animateView);
      this.animateView();
      // view.render();

    } else {
      BB.site.set({'currentPage': view.model.get('page')});
      $('.'+BB.site.get('currentPage')+'_container').addClass('show');
      // view.render();

    }

    BB.site.set({'currView': view});

  },

  animateView: function(payload) {
    var _this = this;
    var animEl = $('.'+BB.site.get('newPage')+'_container');
    var transitionEvent = TransEnd.whichTransitionEvent();
    // BB.site.set('isTransitioning', false);

    animEl.one(transitionEvent, function(event) {
      // console.log('transition END')
      Backbone.pubSub.trigger('animEnd');
    });

    setTimeout(function(){
      animEl.addClass('show');
      BB.site.set('isTransitioning', true);
      // console.log('isTransitioning',BB.site.get('isTransitioning'))
    }, 100);

    BB.site.set({'currentPage': BB.site.get('newPage')})
  },

  animEnd: function(payload) {
    BB.site.set('isTransitioning', false);
    // console.log('isTransitioning',BB.site.get('isTransitioning'))
    BB.site.get('oldView').dispose();

  },

  dispose: function(arg) {

    BaseView.prototype.dispose.apply(this, arguments);
    
  }


});












