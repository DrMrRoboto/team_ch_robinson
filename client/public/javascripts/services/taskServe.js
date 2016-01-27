/**
 * Service for all asynchronous requests for task data
 */
app.factory('taskServe',['$http',function($http){

  return {
    /**
     * Gets all tasks from the database associated with entered eventId
     * @param eventId
     * @returns $http promise object
     */
    getTasks: function(eventId){
      return $http({
        method: 'get',
        url: '/tasks/' + eventId
      }).then(function(response){
        return response.data
      },function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Writes new task to the database
     * @param newTask
     * @returns $http promise object
     */
    createTask: function(newTask){
      return $http({
        method: 'post',
        data: newTask,
        url: '/tasks'
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Sends taskId to be updated in database, along with new task to replace that task
     * @param taskId
     * @param updatedTask
     * @returns $http promise object
     */
    updateTask: function(taskId, updatedTask){
      return $http({
        method: 'put',
        data: updatedTask,
        url: '/tasks/' + taskId
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    },
    /**
     * Sends taskId to be deleted in database
     * @param taskId
     * @returns $http promise object
     */
    deleteTask: function(taskId){
      return $http({
        method: 'delete',
        url: '/tasks/' + taskId
      }).then(function(response){
        return response.data
      }, function(errorResponse){
        return errorResponse.data
      });
    }
  }
}]);