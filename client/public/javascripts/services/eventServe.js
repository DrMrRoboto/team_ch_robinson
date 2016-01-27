/**
 * Service for all asynchronous requests for event data
 */
app.factory('eventServe',['$http',function($http){


  return {
    /**
     * Gets single event from database
     * @param eventId
     * @returns $http promise object
     */
    getEvent: function(eventId){
      return $http({
        method: 'get',
        url: '/events/' + eventId
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Gets all events from database, adds necessary fields to data before
     * @returns $http promise object
     */
    getEvents: function(){
      return $http({
        method: 'get',
        url: '/events'
      }).then(function(response){
        var data = [];
        response.data.forEach(function(element){
          element.type = 'info';
          element.startsAt = new Date(element.startsAt);
          element.endsAt = new Date(element.endsAt);
          data.push(element);
        });
        return response.data;
      }, function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Sends new event to be posted to the database
     * @param newEvent
     * @returns $http promise object
     */
    createEvent: function(newEvent){
      return $http({
        method:'post',
        data: newEvent,
        url: '/events'
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Sends eventId to be updated in database, along with new event to replace current data
     * @param eventId
     * @param updatedEvent
     * @returns $http promise object
     */
    updateEvent: function(eventId, updatedEvent){
      return $http({
        method: 'put',
        data: updatedEvent,
        url: '/events/' + eventId
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Sends eventId to be deleted in database
     * @param eventId
     * @returns $http promise object
     */
    deleteEvent: function(eventId){
      return $http({
        method: 'delete',
        url: '/events/' + eventId
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    }


  }
}]);