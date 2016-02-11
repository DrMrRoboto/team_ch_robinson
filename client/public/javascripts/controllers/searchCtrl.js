app.controller('searchCtrl', ['eventServe', '$scope', '$location', function (eventServe, $scope, $location) {


	/**
	 * Uses eventServe to make http call to retrieve event information from database.
	 */
	eventServe.getEvents().then(function(response){
		$scope.events = response;
	});

	/**
	 * Variable sets the key by which the search result table is sorted
	 * @type {string}
	 */
	$scope.sortType = 'title';

	/**
	 * variable to control ascending or descending sort order in search results table
	 * @type {boolean}
	 */
	$scope.sortReverse = false;

	/**
	 * variable to control the search term to filter search results
	 * @type {string}
	 */
	$scope.searchEvents = '';

}]);