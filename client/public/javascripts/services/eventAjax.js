/**
 * Created by chottinger on 1/26/16.
 */
app.factory('eventService',['$http',function($http){
  return {
    getEvent: function(eventId){
      $http({
        method: 'get',
        url: '/events/' + eventId
      }).then(function(response){
        return response
      }, function(errorResponse){
        return errorResponse
      });
    },
    getEvents: function(){
      $http({
        method: 'get',
        url: '/events'
      }).then(function(response){
        return response
      }, function(errorResponse){
        return errorResponse
      });
    }
  }
}]);