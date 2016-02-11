/**
 * Created by chottinger on 1/21/16.
 */
app.controller('volunteerList', ['$scope','$routeParams','eventServe','taskServe','shiftServe','volunteerServe',
	function($scope, $routeParams, eventServe, taskServe, shiftServe, volunteerServe){


	//ui-grid configurations
	$scope.gridOptions = {};
	//row height for entire grid(dynamic heights not available)
	$scope.gridOptions.rowHeight = 100;

	$scope.gridOptions.onRegisterApi= function(gridApi){
		$scope.gridApi = gridApi;
		//event that sends updated volunteer to database after change
		$scope.gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
			if(newValue == oldValue){return}
			if(rowEntity.volunteer_id){
				volunteerServe.getVolunteer(rowEntity.volunteer_id).then(function(response){
					var updatedVolunteer = response;
					updatedVolunteer.guests[rowEntity.guestArrayIndex]= {
						name: rowEntity.volunteerName,
						shirtSize: rowEntity.volunteerShirt
					};
					volunteerServe.updateVolunteer(updatedVolunteer._id, updatedVolunteer);
				});
			} else if (rowEntity.id){
				var updatedVolunteer = {
					firstName: rowEntity.volunteerName.split(' ')[0],
					lastName: rowEntity.volunteerName.split(' ')[1],
					email: rowEntity.volunteerEmail,
					phone: rowEntity.volunteerPhone,
					shirtSize: rowEntity.volunteerShirt,
					shift_id: rowEntity.shift_id
				};

				volunteerServe.updateVolunteer(rowEntity.id, updatedVolunteer)
			} else if (rowEntity.volunteerName !== '' &&
								 rowEntity.volunteerEmail !== '' &&
								 oldValue == ''){
				var newVolunteer = {
					firstName: rowEntity.volunteerName.split(' ')[0],
					lastName: rowEntity.volunteerName.split(' ')[1],
					email: rowEntity.volunteerEmail,
					phone: rowEntity.volunteerPhone,
					shirtSize: rowEntity.volunteerShirt,
					shift_id: rowEntity.shift_id,
					guests: []
				};
				shiftServe.getShift(rowEntity.shift_id).then(function(response){
					response.slotsUsed++;
					shiftServe.updateShift(response._id, response);
				});
				volunteerServe.postVolunteer(newVolunteer).then(function(response){
					rowEntity.id = response._id;
					rowEntity.volunteerGuests = [];
				});
			}
		});
		$scope.export = function(){
			$scope.gridApi.exporter.csvExport('all','all');
		}
	};

	$scope.gridOptions.enableCellEditOnFocus = true;


	//custome templates for ui-grid cells
	var templateForTextWrap = '<div class="ui-grid-cell-contents wrap" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>'

	var templateForDeleteButton = '<div class="ui-grid-cell-contents">' +
																	'<button class="btn btn-default" type="button" ng-click="grid.appScope.passRowInfo(row.entity)"  ' +
																		'data-toggle="modal" data-target="#deleteUserModal"' +
																		'ng-if="row.entity.volunteerName">' +
																		'Delete' +
																	'</button>' +
																'</div>';

	//column definitions, widths must be defined manually
	$scope.gridOptions.columnDefs = [
		{name: 'date', displayName: 'Date', enableCellEdit: false, cellFilter: 'date: "EEE M/d"',
			width: '6%',cellTemplate: templateForTextWrap, enableColumnMenu: false, enableSorting: false},
		{name: 'taskName', displayName: 'Task', enableCellEdit: false,
			width: '15%', cellTemplate: templateForTextWrap, enableColumnMenu: false, enableSorting: false},
		{name: 'shiftTime', displayName: 'Shift', enableCellEdit: false,
			width: '7%', cellTemplate: templateForTextWrap, enableColumnMenu: false, enableSorting: false},
			//enableCellEditOnFocus: false changes cell edit to be on double click
		{name: 'volunteerName', displayName: 'Volunteer', enableCellEditOnFocus: false,
			width: '15%', cellTemplate: templateForTextWrap},
		{name: 'volunteerEmail', displayName: 'E-mail', enableCellEditOnFocus: false,
			width: '23%',cellTemplate: templateForTextWrap},
		{name: 'volunteerPhone', displayName: 'Phone', enableCellEditOnFocus: false,
			width:'17%',cellTemplate: templateForTextWrap},
		{name: 'volunteerShirt', displayName: 'Shirt Size', enableCellEditOnFocus: false,
			width: '10%',cellTemplate: templateForTextWrap},
		{name: 'deleteButton', displayName: 'Delete', enableCellEdit: false,
			width: '7%', cellTemplate: templateForDeleteButton, enableColumnMenu: false, enableSorting: false}
	];


	//data fetching and storage
	$scope.data = {};

	eventServe.getEvent($routeParams.id).then(function(response){
		$scope.data.eventName = response.title;
	});

	//fetches tasks, then shifts, then volunteers, placing the data
	// in the right format for the grid (empty rows for unoccupied shifts as well)
	$scope.loadGridData = function() {
		$scope.gridOptions.data = [];
		taskServe.getTasks($routeParams.id).then(function (taskResponse) {
			taskResponse.forEach(function (task) {
				shiftServe.getShifts(task._id).then(function (shiftResponse) {
					shiftResponse.forEach(function (shift) {
						volunteerServe.getVolunteers(shift._id).then(function (volunteerResponse) {
							var volunteerAndGuests = guestParser(volunteerResponse,
									shift.slotsAvailable - shift.slotsUsed);
							for (var i = 0; i < shift.slotsAvailable; i++) {
								if (volunteerAndGuests[i]._id) {
									var newTableObject = {
										id: volunteerAndGuests[i]._id,
										taskName: shift.task_name,
										date: shift.date,
										shift_id: shift._id,
										shiftTime: timeConverter(shift.startTime) + '-' + timeConverter(shift.endTime),
										volunteerName: volunteerAndGuests[i].firstName + ' ' + volunteerAndGuests[i].lastName,
										volunteerEmail: volunteerAndGuests[i].email,
										volunteerPhone: volunteerAndGuests[i].phone,
										volunteerShirt: volunteerAndGuests[i].shirtSize,
										volunteerGuests: volunteerAndGuests[i].guests
									};
								} else if (volunteerAndGuests[i].name) {
									var newTableObject = volunteerAndGuests[i];
									newTableObject.date = shift.date;
									newTableObject.shiftTime = timeConverter(shift.startTime) + '-' + timeConverter(shift.endTime);
									newTableObject.taskName = shift.task_name;
									newTableObject.shift_id = shift._id;

								} else {
									var newTableObject = volunteerAndGuests[i];
									newTableObject.shift_id = shift._id;
									newTableObject.taskName = shift.task_name;
									newTableObject.date = shift.date;
									newTableObject.shiftTime = timeConverter(shift.startTime) + '-' + timeConverter(shift.endTime);
								}

								$scope.gridOptions.data.push(newTableObject);
							}
						});
					});
				});
			});
		});
	};

	$scope.loadGridData();

		/**
		 * Function that gives modal access to grid information while also toggling whether
		 * a guest or volunteer has been selected for deletion
		 * @param rowObject
     */
	$scope.passRowInfo = function(rowObject){
		if(rowObject.volunteer_id){
			$scope.volunteerOrGuest = 'guest';
		} else {
			$scope.volunteerOrGuest = 'volunteer';
		}
		$scope.userToDelete = rowObject;
	};

		/**
		 * Function (fired on click inside modal) that deletes a guest or volunteer, manipulating the shift
		 * slotsUsed appropriately as well.
		 */
	$scope.removeUser = function(){
		if($scope.userToDelete.volunteer_id){
			volunteerServe.getVolunteer($scope.userToDelete.volunteer_id).then(function(response) {

				var updatedVolunteer = response;
				updatedVolunteer.guests.splice($scope.userToDelete.guestArrayIndex, 1);
				volunteerServe.updateVolunteer(updatedVolunteer._id, updatedVolunteer).then(function(){
					shiftServe.getShift($scope.userToDelete.shift_id).then(function(response){
						response.slotsUsed--;
						shiftServe.updateShift(response._id, response).then(function(){
							$scope.loadGridData();
						});
					});
				});

			});
		}else {
			volunteerServe.deleteVolunteer($scope.userToDelete.id).then(function(){
				shiftServe.getShift($scope.userToDelete.shift_id).then(function(response){
					response.slotsUsed -= (1 + $scope.userToDelete.volunteerGuests.length);
					shiftServe.updateShift(response._id, response).then(function(){
						$scope.loadGridData();
					});
				});
			});
		}
	};
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
 * Converts an array of volunteer data into an array of row data for ui-grid, including empty rows for shifts
 * @param array
 * @returns {array}
 */
function guestParser(array, emptyRows){
	var volunteerAndGuests = [];
	for(var i = 0; i < array.length;i++){
		volunteerAndGuests.push(array[i]);
		if(array[i].guests.length !== 0){
			array[i].guests.forEach(function(guest, index){
				guest._id = false;
				guest.guestArrayIndex = index;
				guest.volunteer_id = array[i]._id;
				guest.volunteerName = guest.name;
				guest.volunteerEmail = 'Guest of ' + array[i].firstName + ' ' + array[i].lastName;
				guest.volunteerPhone = 'Guest of ' + array[i].firstName + ' ' + array[i].lastName;
				guest.volunteerShirt = guest.shirtSize;
				volunteerAndGuests.push(guest);
			});
		}
	}
	for(i = 0; i < emptyRows; i++){
		volunteerAndGuests.push({
			_id: false,
			volunteerName: '',
			volunteerEmail: '',
			volunteerPhone: '',
			volunteerShirt: ''
		});
	}
	return volunteerAndGuests;
}


