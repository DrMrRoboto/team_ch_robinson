/**
 * Created by chottinger on 1/21/16.
 */
app.controller('userEvent', ['$scope', '$routeParams', 'eventServe', 'shiftServe',
	function ($scope, $routeParams, eventServe, shiftServe) {

		$scope.shifts = [];

		if ($routeParams.id) {
			eventServe.getEvent($routeParams.id).then(function (response) {
				$scope.event = response;
				shiftServe.getShifts($routeParams.id).then(function (response) {
					console.log(response);
					$scope.shifts = response;
				});
			});
		}

	}]);