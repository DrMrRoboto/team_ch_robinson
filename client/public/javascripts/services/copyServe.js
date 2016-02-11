app.factory('copyServe',['$http', 'eventServe', 'taskServe',
	function($http, eventServe, taskServe){


		/**
		 * Function pulls down previous event, changes the dates using date inputs, and saves to database as
		 * new event
		 */
		return {
			copyEvent: function(eventId, newStartAt, newEndAt) {
				return eventServe.getEvent(eventId).then(function(eventResponse){
					var newEvent = {
						title: eventResponse.title,
						description: eventResponse.description,
						startsAt: newStartAt,
						endsAt: newEndAt,
						host: eventResponse.host
					};
					return eventServe.createEvent(newEvent).then(function(newEventResponse) {
						taskServe.getTasks(eventId).then(function(taskResponse) {
							var taskList = taskResponse;
							taskList.forEach(function(task) {
								var newTask = {
									name: task.name,
									description: task.description,
									event_id: newEventResponse._id
								};
								taskServe.createTask(newTask);
							});
						});
						return newEventResponse;
					});
				});
			}
		};

	}]);
