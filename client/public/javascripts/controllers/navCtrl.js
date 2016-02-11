app.controller('navCtrl', ['navServe', '$scope', '$location', '$routeParams', function (navServe, $scope, $location, $routeParams) {

	/**
	 * Function returns boolean to indicate if user is in the admin area to control
	 * which navbar items are visible
	 * @returns {*}
	 */
	$scope.adminPath = function() {
		return navServe.adminPath($location.path(), $routeParams.id);
	};

	/**
	 * Function returns boolean that controls when search link is visible in nav bar
	 * @returns {*}
	 */
	$scope.showSearch = function() {
		return navServe.showSearch($location.path());
	};

	/**
	 * Function returns boolean that controls when volunteer report function is visible in nav bar
	 * @returns {*}
	 */
	$scope.showVolunteers = function() {
		return navServe.showVolunteers($location.path(), $routeParams.id);
	};

	/**
	 * Function returns boolean that controls  when back link is visible on the nav bar
	 * @returns {*}
	 */
	$scope.showBack = function() {
		return navServe.showBack($location.path());
	};

	/**
	 * Function returns boolen that controls what is visible in the nav bar for the volunteer report view
	 * @returns {string}
	 */
	$scope.volunteerPath = function(){
		return '/#/volunteerList/' + $routeParams.id;
	}

}]);