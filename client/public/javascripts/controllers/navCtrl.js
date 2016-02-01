app.controller('navCtrl', ['navServe', '$scope', '$location', '$routeParams', function (navServe, $scope, $location, $routeParams) {


	$scope.adminPath = function() {
		return navServe.adminPath($location.path(), $routeParams.id);
	};

	$scope.showSearch = function() {
		return navServe.showSearch($location.path());
	};

	$scope.showVolunteers = function() {
		return navServe.showVolunteers($location.path(), $routeParams.id);
	};

	$scope.showBack = function() {
		return navServe.showBack($location.path());
	};

	$scope.volunteerPath = function(){
		return '/#/volunteerList/' + $routeParams.id;
	}

}]);