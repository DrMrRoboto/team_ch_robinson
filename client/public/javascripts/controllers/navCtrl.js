app.controller('navCtrl', ['navServe', '$scope', '$location', function (navServe, $scope, $location) {

	$scope.adminPath = function() {
		return navServe.adminPath($location.path());
	};

	$scope.showSearch = function() {
		return navServe.showSearch($location.path());
	};

	$scope.showVolunteers = function() {
		return navServe.showVolunteers($location.path());
	};

	$scope.showBack = function() {
		return navServe.showBack($location.path());
	};

}]);