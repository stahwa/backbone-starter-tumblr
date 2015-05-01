"use strict";

var navState = {
	getSlideDir: function(oldPage, newPage) {
		
		var pages = ['home', 'about', 'more'];
		var oldIndex = pages.indexOf(oldPage);
		var newIndex = pages.indexOf(newPage);

		if (newIndex >= oldIndex) {
			return 'left';
		} else {
			return 'right';
		}
	}


};


module.exports = navState;