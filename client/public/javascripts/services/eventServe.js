/**
 * Created by chottinger on 1/26/16.
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
    }
  }
}]);