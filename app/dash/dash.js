'use strict';

angular.module('myApp.dash', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dash', {
    templateUrl: 'dash/dash.html',
    controller: 'DashCtrl'
  });
}])

.controller('DashCtrl', [ '$scope', '$resource', '$timeout', '$http', 
	function($scope, $resource, $timeout, $http) {

		var Crest = $resource('http://localhost:8080/crest/v1/api', {}, {
			query: { method: "GET", isArray: false }
		});

		$scope.apiSuccess = [];
		$scope.apiStatus = [];
		$scope.apiMessage = "";

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

		function pokeApi() {
			$http.get('http://localhost:8080/crest/v1/api').
			success(function(data, status, headers, config) {
				$scope.apiSuccess = true;
				$scope.apiStatus = status;
				$scope.apiMessage = [];
				getData();
			}).
			error(function(data, status, headers, config) {
				$scope.apiSuccess = false;
				$scope.apiStatus = status;

				if (data != null) { $scope.apiMessage = data.status; }
				else { $scope.apiMessage = "Cannot connect to the CREST service, please ensure CREST is running."}
				
				$timeout(pokeApi, 1000);
			});
		};

		function getData() {
			Crest.query(function(data, status) {
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

				console.log(data);

				$timeout(getData, 50);
			});
		};

		pokeApi();
}]);