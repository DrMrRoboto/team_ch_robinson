/**
 * Created by chottinger on 1/21/16.
 */
app.controller('userEvent', ['$scope', '$routeParams', 'eventServe', 'taskServe', 'shiftServe', 'volunteerServe',
	function ($scope, $routeParams, eventServe, taskServe, shiftServe, volunteerServe) {

		/**
		 * Variables to control sort functions for shift table in user Event view
		 * @type {string}
		 */
		$scope.sortType = 'task_name';
		$scope.sortReverse = false;

		/**
		 * An array of available shift populated by loadUserEvent()
		 * @type {Array}
		 */
		$scope.shifts = [];

		/**
		 * Object provides data variables to be passed to the database to create new volunteer document
		 * @type {{firstName: string, lastName: string, email: string, phone: string, shirtSize: string, guests: string}}
		 */
		$scope.newVolunteer = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			shirtSize: "",
			guests: ""
		};

		/**
		 * Object to be passed into guests array when new guest is added
		 * @type {{name: string, shirtSize: string}}
		 */
		$scope.newGuest = {
			name: "",
			shirtSize: ""
		};

		/**
		 * Array for guests for new volunteer
		 * @type {Array}
		 */
		$scope.guests = [];

		/**
		 * Function uses eventServe, taskServe, and shiftServe to call event and shift information from the database
		 */
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
								console.log(shift);
								$scope.shifts.push(shift);
							});
						});
					});
				})
			});
		};

		/**
		 * calls loadUserEvent() if an id parameter is passed to the URL
		 */
		if ($routeParams.id) {
			$scope.loadUserEvent();
		}

		/**
		 * Function empties the guest array to reset it for the next batch of guests
		 */
		$scope.clearGuests = function() {
			$scope.guests = [];
		};

		/**
		 * Function pushed guest in newGuest object to the guests array and resets newGuest object
		 */
		$scope.addGuest = function() {
			$scope.guests.push($scope.newGuest);
			$scope.newGuest = {
				name: "",
				shirtSize: ""
			};
		};

		/**
		 * Function uses volunteerServe to save newVolunteer to the database
		 * @param shiftId
		 * @param slotsUsed
		 */
		$scope.saveVolunteer = function(shiftId, slotsUsed) {
			$scope.shifts = [];
			$scope.newVolunteer.shift_id = shiftId;
			$scope.newVolunteer.guests = $scope.guests;
			shiftServe.updateShift(shiftId, {slotsUsed: slotsUsed});
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