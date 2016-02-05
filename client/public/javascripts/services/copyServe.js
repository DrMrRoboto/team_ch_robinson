app.factory('copyServe',['$http', 'eventServe', 'taskServe',
	function($http, eventServe, taskServe){

		return {
			copyEvent: function(eventId, newStartAt, newEndAt) {
				eventServe.getEvent(eventId).then(function(res){
					var newEvent = res;
					newEvent.startsAt = newStartAt;
					newEvent.endsAt = newEndAt;
					eventServe.createEvent(newEvent);
				})
			}
		};

	}]);
