/**
 * Created by chottinger on 1/21/16.
 */
app.controller('volunteerList', ['$scope','$routeParams','eventServe','taskServe','shiftServe','volunteerServe',
	function($scope, $routeParams, eventServe, taskServe, shiftServe, volunteerServe){

	$scope.data = {};

	$scope.displayData = [];

	eventServe.getEvent($routeParams.id).then(function(response){
		$scope.data.eventName = response.title;
	});

	taskServe.getTasks($routeParams.id).then(function(response) {
		$scope.data.tasks = response;
		$scope.data.tasks.forEach(function (element) {
			shiftServe.getShifts(element._id).then(function (response) {
				element.shifts = response;
				element.shifts.forEach(function (element) {
					volunteerServe.getVolunteers(element._id).then(function (response) {
						for (var i = 0; i < element.slotsAvailable; i++) {
							if (response[i]) {
								var newTableObject = {
									taskName: element.task_name,
									date: element.date,
									startTime: element.startTime,
									endTime: element.endTime,
									volunteerName: response[i].firstName + ' ' + response[i].lastName,
									volunteerEmail: response[i].email,
									volunteerPhone: response[i].phone,
									volunteerShirt: response[i].shirtSize,
									volunteerGuests: response[i].guests
								};
							} else {
								var newTableObject = {
									taskName: element.task_name,
									date: element.date,
									startTime: element.startTime,
									endTime: element.endTime,
									volunteerName: '',
									volunteerEmail: '',
									volunteerPhone: '',
									volunteerShirt: '',
									volunteerGuests: []
								};

							}
							$scope.displayData.push(newTableObject);
							element.volunteers = response;
						}
					});
				});
			});
		});
	});

	setTimeout(function(){
		console.log($scope.data);
	}, 3000);

}]);