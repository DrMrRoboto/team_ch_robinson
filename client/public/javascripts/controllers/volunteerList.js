/**
 * Created by chottinger on 1/21/16.
 */
app.controller('volunteerList', ['$scope','$routeParams','eventServe','taskServe','shiftServe','volunteerServe',
	function($scope, $routeParams, eventServe, taskServe, shiftServe, volunteerServe){

	eventServe.getEvent($routeParams.id).then(function(response){
		$scope.data.eventName = response.title;

	});

	taskServe.getTasks($routeParams.id).then(function(response){
		$scope.data.tasks = response;
		$scope.data.tasks.forEach(function(element){
			shiftServe.getShifts(element._id).then(function(response){
				element.shifts = response;
				element.shifts.forEach(function(element){
					volunteerServe.getVolunteers(element._id).then(function(response){
						element.volunteers = response;
					});
				});
			});
		});
	});

}]);