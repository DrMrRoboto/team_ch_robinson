/**
 * Created by chottinger on 1/21/16.
 */
app.controller('volunteerList', ['$scope','$routeParams','eventServe','taskServe','shiftServe','volunteerServe',
	function($scope, $routeParams, eventServe, taskServe, shiftServe, volunteerServe){

	$scope.gridOptions = {};
	$scope.gridOptions.enableCellEditOnFocus = true;
	$scope.gridOptions.data = [];
	$scope.data = {};

	$scope.gridOptions.columnDefs = [
		{name: 'date', displayName: 'Date', enableCellEdit: false, cellFilter: 'date: "EEE M/d"'},
		{name: 'taskName', displayName: 'Task', enableCellEdit: false},
		{name: 'shiftTime', displayName: 'Shift', enableCellEdit: false},
		{name: 'volunteerName', displayName: 'Volunteer', enableCellEditOnFocus: false},
		{name: 'volunteerEmail', displayName: 'E-mail', enableCellEditOnFocus: false},
		{name: 'volunteerPhone', displayName: 'Phone', enableCellEditOnFocus: false},
		{name: 'volunteerShirt', displayName: 'Shirt Size', enableCellEditOnFocus: false},
		{name: 'volunteerGuests', displayName: 'Guests', enableCellEditOnFocus: false},
	];

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
									id: element._id,
									taskName: element.task_name,
									date: element.date,
									shiftTime: timeConverter(element.startTime) + '-' + timeConverter(element.endTime),
									volunteerName: response[i].firstName + ' ' + response[i].lastName,
									volunteerEmail: response[i].email,
									volunteerPhone: response[i].phone,
									volunteerShirt: response[i].shirtSize,
									volunteerGuests: guestParser(response[i].guests)
								};
							} else {
								var newTableObject = {
									id: element._id,
									taskName: element.task_name,
									date: element.date,
									shiftTime: timeConverter(element.startTime) + '-' + timeConverter(element.endTime),
									volunteerName: '',
									volunteerEmail: '',
									volunteerPhone: '',
									volunteerShirt: '',
									volunteerGuests: ''
								};

							}
							$scope.gridOptions.data.push(newTableObject);
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


function timeConverter (time){
		var hours = Math.floor(time / 60);
		var minutes = (time % 60);

		if(minutes < 10){
			minutes = '0' + minutes;
		};

		if(hours === 0 || hours === 24){
			return '12:' + minutes + ' am'
		} else if(hours < 12) {
			return hours + ':' + minutes + " am"
		} else if(hours === 12){
			return '12:' + minutes + ' pm'
		} else if(hours > 12) {
			return (hours-12) + ':' + minutes + ' pm'
		}

}

function guestParser(array){
	var guestString = '';
	for(var i = 0; i < array.length; i++){
		guestString += array[i].name + ' ';
		guestString += array[i].shirtSize + '\n';

	}
	return guestString;
}