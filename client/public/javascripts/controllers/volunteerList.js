/**
 * Created by chottinger on 1/21/16.
 */
app.controller('volunteerList', ['$scope','$routeParams','eventServe','taskServe','shiftServe','volunteerServe',
	function($scope, $routeParams, eventServe, taskServe, shiftServe, volunteerServe){

	//ui-grid configurations
	$scope.gridOptions = {};
	//row height for entire grid(dynamic heights not available
	$scope.gridOptions.rowHeight = 100;
	//event that sends updated volunteer to database after change
	$scope.gridOptions.onRegisterApi= function(gridApi){
		$scope.gridApi = gridApi;
		$scope.gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
			if(newValue !== oldValue){
				var updatedVolunteer = {
					firstName: rowEntity.volunteerName.split(' ')[0],
					lastName: rowEntity.volunteerName.split(' ')[1],
					email: rowEntity.volunteerEmail,
					phone: rowEntity.volunteerPhone,
					shirtSize: rowEntity.volunteerShirt,
					guests: rowEntity.volunteerGuests.split(','),
					shift_id: rowEntity.shift_id
				};
				volunteerServe.updateVolunteer(rowEntity.id, updatedVolunteer).then(function(response){
					rowEntity.volunteerGuests = guestParser(response.guests);
				});
			}
		});
		$scope.export = function(){
			$scope.gridApi.exporter.csvExport('all','all');
		}
	};

	$scope.gridOptions.enableCellEditOnFocus = true;
	$scope.gridOptions.data = [];

	var templateForTextWrap = '<div class="ui-grid-cell-contents wrap" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>'

	//column definitions, widths must be defined manually
	$scope.gridOptions.columnDefs = [
		{name: 'date', displayName: 'Date', enableCellEdit: false,
			cellFilter: 'date: "EEE M/d"', width: '6%',cellTemplate: templateForTextWrap},
		{name: 'taskName', displayName: 'Task', enableCellEdit: false,
			width: '20%', cellTemplate: templateForTextWrap},
		{name: 'shiftTime', displayName: 'Shift', enableCellEdit: false,
			width: '7%', cellTemplate: templateForTextWrap},
			//enableCellEditOnFocus: false changes cell edit to be on double click
		{name: 'volunteerName', displayName: 'Volunteer', enableCellEditOnFocus: false,
			width: '15%', cellTemplate: templateForTextWrap},
		{name: 'volunteerEmail', displayName: 'E-mail', enableCellEditOnFocus: false,
			width: '25%',cellTemplate: templateForTextWrap},
		{name: 'volunteerPhone', displayName: 'Phone', enableCellEditOnFocus: false,
			width:'17%',cellTemplate: templateForTextWrap},
		{name: 'volunteerShirt', displayName: 'Shirt Size', enableCellEditOnFocus: false,
			width: '10%',cellTemplate: templateForTextWrap}
	];



	//data fetching and storage
	$scope.data = {};

	eventServe.getEvent($routeParams.id).then(function(response){
		$scope.data.eventName = response.title;
	});

	//fetches tasks, then shifts, then volunteers, placing the data
	// in the right format for the grid (empty rows for unoccupied shifts as well)
	taskServe.getTasks($routeParams.id).then(function(response) {
		$scope.data.tasks = response;
		$scope.data.tasks.forEach(function (element) {
			shiftServe.getShifts(element._id).then(function (response) {
				element.shifts = response;
				element.shifts.forEach(function (element) {
					console.log(element);
					volunteerServe.getVolunteers(element._id).then(function (response) {
						var i = 0;
						while(i < element.slotsAvailable) {
							if (i < element.slotsUsed) {
								var newTableObject = {
									id: response[i]._id,
									shift_id: element._id,
									taskName: element.task_name,
									date: element.date,
									shiftTime: timeConverter(element.startTime) + '-' + timeConverter(element.endTime),
									volunteerName: response[i].firstName + ' ' + response[i].lastName,
									volunteerEmail: response[i].email,
									volunteerPhone: response[i].phone,
									volunteerShirt: response[i].shirtSize,
									volunteerGuests: response[i].guests
								};

								$scope.gridOptions.data.push(newTableObject);

								i++;



								for (var index = 0; index < newTableObject.volunteerGuests.length; index++){
									var newGuest = {};
									newGuest.volunteer_id = newTableObject.id;
									newGuest.taskName = newTableObject.taskName;
									newGuest.date = newTableObject.date;
									newGuest.shiftTime = newTableObject.shiftTime;
									newGuest.volunteerName = newTableObject.volunteerGuests[index].name;
									newGuest.volunteerEmail = 'Guest of ' + newTableObject.volunteerName;
									newGuest.volunteerPhone = 'Guest of ' + newTableObject.volunteerName;
									newGuest.volunteerShirt = newTableObject.volunteerGuests[index].shirtSize;
									$scope.gridOptions.data.push(newGuest);
									i++;
								}

							} else {
								var newTableObject = {
									id: element._id,
									shift_id: element.shift_id,
									taskName: element.task_name,
									date: element.date,
									shiftTime: timeConverter(element.startTime) + '-' + timeConverter(element.endTime),
									volunteerName: '',
									volunteerEmail: '',
									volunteerPhone: '',
									volunteerShirt: '',
									volunteerGuests: ''
								};
								$scope.gridOptions.data.push(newTableObject);
								i++;
							}



							element.volunteers = response;
						}
					});
				});
			});
		});
	});

}]);



/**
 * Function that takes in time in minutes elapsed and converts it into appropriate H:MM AM/PM
 * @param time
 * @returns {string}
 */
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

/**
 * Converts array of guest data into single string
 * @param array
 * @returns {string}
 */
function guestParser(array){
	var guestString = '';
	for(var i = 0; i < array.length; i++){
		if(i !== array.length - 1) {
			guestString += array[i] + ',\n';
		} else {
			guestString += array[i];
		}
	}
	return guestString;
}

