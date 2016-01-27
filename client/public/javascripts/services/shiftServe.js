/**
 * Created by chottinger on 1/27/16.
 */
/**
 * Service for all asynchronous requests for shift data
 */
app.factory('shiftServe',['$http',function($http){

  return {
    /**
     * Gets all shifts from the database associated with entered taskId
     * @param taskId
     * @returns $http promise object
     */
    getShifts: function(taskId){
      return $http({
        method: 'get',
        url: '/shifts/' + taskId
      }).then(function(response){
        return response.data
      },function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Writes new shift to the database
     * @param newShift
     * @returns $http promise object
     */
    createShift: function(newShift){
      return $http({
        method: 'post',
        data: newShift,
        url: '/shifts'
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Sends shiftId to be updated in database, along with new shift to replace that shift
     * @param shiftId
     * @param updatedShift
     * @returns $http promise object
     */
    updateShift: function(shiftId, updatedShift){
      return $http({
        method: 'put',
        data: updatedShift,
        url: '/shifts/' + shiftId
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Sends shiftId to be deleted in database
     * @param shiftId
     * @returns $http promise object
     */
    deleteShift: function(shiftId){
      return $http({
        method: 'delete',
        url: '/shifts/' + shiftId
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    }
  }
}]);