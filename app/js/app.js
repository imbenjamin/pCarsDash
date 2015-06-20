'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.view1',
  'myApp.view2',
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
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
