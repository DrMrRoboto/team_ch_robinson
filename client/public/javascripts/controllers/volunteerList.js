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
			if(newValue == oldValue){return}

			if(rowEntity.volunteer_id){
				volunteerServe.getVolunteer(rowEntity.volunteer_id).then(function(response){
					var updatedVolunteer = response;
					updatedVolunteer.guests[rowEntity.guestArrayIndex]= {
						name: rowEntity.volunteerName,
						shirtSize: rowEntity.volunteerShirt
					}
					volunteerServe.postVolunteer(updatedVolunteer._id);
				});
			} else if (rowEntity.volunteerName !== '' &&
			rowEntity.volunteerEmail !== '' &&
			oldValue == '') {
				var newVolunteer = {
					firstName: rowEntity.volunteerName.split(' ')[0],
					lastName: rowEntity.volunteerName.split(' ')[1],
					email: rowEntity.volunteerEmail,
					phone: rowEntity.volunteerPhone,
					shirtSize: rowEntity.volunteerShirt,
					shift_id: rowEntity.shift_id,
					guests: []
				};
				volunteerServe.postVolunteer(newVolunteer);
			} else {
				var updatedVolunteer = {
					firstName: rowEntity.volunteerName.split(' ')[0],
					lastName: rowEntity.volunteerName.split(' ')[1],
					email: rowEntity.volunteerEmail,
					phone: rowEntity.volunteerPhone,
					shirtSize: rowEntity.volunteerShirt,
					shift_id: rowEntity.shift_id
				};

				volunteerServe.updateVolunteer(rowEntity.id, updatedVolunteer)
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
	taskServe.getTasks($routeParams.id).then(function(taskResponse) {
		taskResponse.forEach(function (task) {
			shiftServe.getShifts(task._id).then(function (shiftResponse) {
				shiftResponse.forEach(function (shift) {
					volunteerServe.getVolunteers(shift._id).then(function (volunteerResponse) {
						var i = 0;
						while(i < shift.slotsAvailable) {
							if (i < shift.slotsUsed) {
								var newTableObject = {
									id: volunteerResponse[i]._id,
									shift_id: shift._id,
									taskName: shift.task_name,
									date: shift.date,
									shiftTime: timeConverter(shift.startTime) + '-' + timeConverter(shift.endTime),
									volunteerName: volunteerResponse[i].firstName + ' ' + volunteerResponse[i].lastName,
									volunteerEmail: volunteerResponse[i].email,
									volunteerPhone: volunteerResponse[i].phone,
									volunteerShirt: volunteerResponse[i].shirtSize,
									volunteerGuests: volunteerResponse[i].guests
								};

								$scope.gridOptions.data.push(newTableObject);

								i++;



								for (var index = 0; index < newTableObject.volunteerGuests.length; index++){
									var newGuest = {};
									newGuest.guestArrayIndex = index;
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
									id: shift._id,
									shift_id: shift.shift_id,
									taskName: shift.task_name,
									date: shift.date,
									shiftTime: timeConverter(shift.startTime) + '-' + timeConverter(shift.endTime),
									volunteerName: '',
									volunteerEmail: '',
									volunteerPhone: '',
									volunteerShirt: '',
									volunteerGuests: ''
								};
								$scope.gridOptions.data.push(newTableObject);
								i++;
							}



							shift.volunteers = response;
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

