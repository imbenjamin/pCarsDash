'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', '$resource', '$timeout', 
	function($scope, $resource, $timeout) {

		var Crest = $resource('http://localhost:8080/crest/v1/api', {}, {
			query: { method: "GET", isArray: false }
		});

		$scope.buildinfo = [];
		$scope.gameStates = [];
		$scope.participants = [];
		$scope.unfilteredInput = [];
		$scope.vehicleInformation = [];
		$scope.eventInformation = [];
		$scope.timings = [];
		$scope.flags = [];
		$scope.pitInfo = [];
		$scope.carState = [];
		$scope.motionAndDeviceRelated = [];
		$scope.wheelsAndTyres = [];
		$scope.carDamage = [];
		$scope.weather = [];

		(function tick() {
			Crest.query(function(data) {
				//console.log("Game state: "+data.gameStates.mGameState)
				$scope.buildinfo = data.buildinfo;
				$scope.gameStates = data.gameStates;
				$scope.participants = data.participants;
				$scope.unfilteredInput = data.unfilteredInput;
				$scope.vehicleInformation = data.vehicleInformation;
				$scope.eventInformation = data.eventInformation;
				$scope.timings = data.timings;
				$scope.flags = data.flags;
				$scope.pitInfo = data.pitInfo;
				$scope.carState = data.carState;
				$scope.motionAndDeviceRelated = data.motionAndDeviceRelated;
				$scope.wheelsAndTyres = data.wheelsAndTyres;
				$scope.carDamage = data.carDamage;
				$scope.weather = data.weather;

				$timeout(tick, 50);
			});
		})();
}]);