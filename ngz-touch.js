/**
 * License: MIT
 */
(function(window, angular, undefined) {
'use strict';

/**
 * @ngdoc overview
 * @name ngzTouch
 * @description
 */

/**
 * @ngdoc object
 * @name ngzTouch
 * @requires hammerjs
 *
 */
var module = angular.module('ngzTouch', ['ng']);

angular.forEach({
	ngzTap: "tap",
	ngzSwipe: "swipe",
	ngzSwipeleft: "swipeleft",
	ngzSwiperight: "swiperight",
	ngzDoubletap: "doubletap",
	ngzSwipeup: "swipeup",
	ngzSwipedown: "swipedown",
	ngzHold: "hold",
	ngzRotate: "rotate",
	ngzDrag: "drag",
	ngzDragstart: "dragstart",
	ngzDragend: "dragend",
	ngzDragup: "dragup",
	ngzDragdown: "dragdown",
	ngzDragleft: "dragleft",
	ngzDragright: "dragright",
	ngzTransform: "transform",
	ngzTransformstart: "transformstart",
	ngzTransformend: "transformend",
	ngzRotate: "rotate",
	ngzPinch: "pinch",
	ngzPinchout: "pinchout",
	ngzPinchin: "pinchin",
	ngzTouch: "touch",
	ngzRelease: "release"
	}, function (value, key) {
		module.directive( key, function() {
			return function (scope, element, attrs) {
				var optionsKey = key + "Options";
				attrs[optionsKey] = attrs[optionsKey] || {};
				// TODO: Options
				return Hammer(element[0],scope.$eval(attrs[optionsKey]))
					.on( value, function (event) {
						// Differentiate between callbacks and other expressions
						var applied = scope.$apply( attrs[key] );
						if(typeof(applied) == "function"){
							return angular.bind( scope, scope.$apply( attrs[key] ), event )();
						}
					});
			}
		});
	});
})(window, window.angular);
