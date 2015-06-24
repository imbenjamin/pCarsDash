'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.dash',
  'myApp.version'
]).
filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]).
filter('racetime', [function() {
    return function(seconds) {
    	var date = new Date(1970, 0, 1);
    	if (seconds > 0) {
    		date.setMilliseconds(seconds*1000);
    	}
        return date;
    };
}]).
filter('msToMph', [function() {
	return function(ms) {
		return ms * 2.23693629;
	};
}]).
filter('ordinal', [function() {
  return function(input) {
    var s=["th","st","nd","rd"],
    v=input%100;
    return input+(s[(v-20)%10]||s[v]||s[0]);
  }
}]).
filter('ordinalOnly', [function() {
  return function(input) {
    var s=["th","st","nd","rd"],
    v=input%100;
    return (s[(v-20)%10]||s[v]||s[0]);
  }
}]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dash'});
}]);
