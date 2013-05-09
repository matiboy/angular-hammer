/**
 * License: MIT
 */
(function(window, angular, undefined) {
'use strict';

/**
 * @ngdoc overview
 * @name ahTouch
 * @description
 */

/**
 * @ngdoc object
 * @name ahTouch
 * @requires hammerjs
 *
 */
var ahTouchModule = angular.module('ahTouch', ['ng']);

angular.forEach({
	ahTap: "tap",
	ahSwipe: "swipe",
	ahSwipeleft: "swipeleft",
	ahSwiperight: "swiperight",
	ahDoubletap: "doubletap",
	ahSwipeup: "swipeup",
	ahSwipedown: "swipedown",
	ahHold: "hold",
	ahRotate: "rotate",
	ahDrag: "drag",
	ahDragstart: "dragstart",
	ahDragend: "dragend",
	ahDragup: "dragup",
	ahDragdown: "dragdown",
	ahDragleft: "dragleft",
	ahDragright: "dragright",
	ahTransform: "transform",
	ahTransformstart: "transformstart",
	ahTransformend: "transformend",
	ahPinch: "pinch",
	ahPinchout: "pinchout",
	ahPinchin: "pinchin",
	ahTouch: "touch",
	ahRelease: "release"
	}, function (value, key) {
		ahTouchModule.directive( key, function() {
			return function (scope, element, attrs) {
				var optionsKey = key + "Options";
				attrs[optionsKey] = attrs[optionsKey] || {};
				// TODO: Options
				var hammer = Hammer(element[0],scope.$eval(attrs[optionsKey]));
				var fn = function (event) {
						// Differentiate between callbacks and other expressions
						var applied = scope.$apply( attrs[key] );
						if(typeof(applied) == "function"){
							return angular.bind( scope, scope.$apply( attrs[key] ), event )();
						}
					}
				hammer.on( value, fn);
				
				// Taken from https://github.com/monospaced/angular-hammer/blob/master/angular-hammer.js
				// unbind Hammer touch event
				scope.$on('$destroy', function(){
				  hammer.off(value, fn);
				});
			}
		});
	});
})(window, window.angular);
