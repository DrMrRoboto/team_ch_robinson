app.controller('searchCtrl', ['eventServe', '$scope', '$location', function (eventServe, $scope, $location) {

	eventServe.getEvents().then(function(response){
		$scope.events = response;
	});

	$scope.sortType = 'title';
	$scope.sortReverse = false;
	$scope.searchEvents = '';

}]);