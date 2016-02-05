/**
 * Created by chottinger on 1/21/16.
 */
app.controller('userEvent', ['$scope', '$routeParams', 'eventServe', 'taskServe', 'shiftServe', 'volunteerServe',
	function ($scope, $routeParams, eventServe, taskServe, shiftServe, volunteerServe) {

		$scope.shifts = [];
		$scope.newVolunteer = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			shirtSize: "",
			guests: ""
		};
		$scope.newGuest = {
			name: "",
			shirtSize: ""
		};
		$scope.guests = [];

		$scope.loadUserEvent = function() {
			eventServe.getEvent($routeParams.id).then(function (response) {
				$scope.event = response;
			});
			taskServe.getTasks($routeParams.id).then(function(response) {
				$scope.tasks = response;
				$scope.tasks.forEach(function(task) {
					shiftServe.getShifts(task._id).then(function (response) {
						$scope.shiftResponse = response;
						$scope.shiftResponse.forEach(function(shift){
							volunteerServe.getVolunteers(shift._id).then(function(response) {
								shift.volunteers = response;
								shift.volunteers.forEach(function(volunteer) {
									shift.slotsUsed = 0;
									shift.slotsUsed += 1;
									shift.slotsUsed += volunteer.guests.length;
								});
								$scope.shifts.push(shift);
							});
						});
					});
				})
			});
		};

		if ($routeParams.id) {
			$scope.loadUserEvent();
		}

		$scope.clearGuests = function() {
			$scope.guests = [];
		};

		$scope.addGuest = function() {
			$scope.guests.push($scope.newGuest);
			$scope.newGuest = {
				name: "",
				shirtSize: ""
			};
		};

		$scope.saveVolunteer = function(shiftId) {
			$scope.shifts = [];
			$scope.newVolunteer.shift_id = shiftId;
			$scope.newVolunteer.guests = $scope.guests;
			volunteerServe.postVolunteer($scope.newVolunteer)
					.then(function(){
				$scope.loadUserEvent();
				$scope.newVolunteer = {
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					shirtSize: "",
					guests: ""
				};
				$scope.clearGuests();
			});
		}
	}]);