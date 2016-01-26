app.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.adminPath = function() {
		if($location.path() === '/adminCal') {
			return true;
		} else if($location.path() === '/adminEvent') {
			return true;
		} else if($location.path() === '/volunteerList') {
			return true;
		} else {
			return false;
		}
	};

}]);