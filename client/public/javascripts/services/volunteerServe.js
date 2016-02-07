/**
 * Created by Totep on 1/27/16.
 */
app.factory('volunteerServe',['$http',function($http){
    return {

        /**
         * Gets single volunteer from database
         * @param volunteerId
         * @returns $http promise object
         */
        getVolunteer: function(volunteerId){
            return $http({
                method: 'get',
                url: '/volunteers/report/' + volunteerId
            }).then(function(response){
                return response.data
            }, function(errorResponse){
                return errorResponse.data
            });
        },
        /**
         * Gets all volunteers from database, adds necessary fields to data before
         * @returns $http promise object
         */
        getVolunteers: function(shiftId){
            return $http({
                method: 'get',
                url: '/volunteers/' + shiftId
            }).then(function(response){
                return response.data;
            }, function(errorResponse){
                return errorResponse.data
            });
        },

        /**
         * Sends new volunteer to be posted to the database
         * @param newVolunteer
         * @returns $http promise object
         */

        postVolunteer: function(newVolunteer){
            return $http({
                method: 'post',
                data: newVolunteer,
                url: '/volunteers/'
            }).then(function(response){
                return response.data
            }, function(errorResponse){
                return errorResponse.data
            });
        },
        /**
        * Sends volunteerId to be updated in database, along with new event to replace current data
        * @param volunteerId
        * @param updatedVolunteer
        * @returns $http promise object
        */
        updateVolunteer: function(volunteerId, updatedVolunteer){
            return $http({
                method: 'put',
                data: updatedVolunteer,
                url: '/volunteers/' + volunteerId
            }).then(function(response){
                return response.data
            }, function(errorResponse){
                return errorResponse.data
            });
        },
        /**
         * Sends volunteerId to be deleted in database
         * @param volunteerId
         * @returns $http promise object
         */
        deleteVolunteer: function(volunteerId){
            return $http({
                method: 'delete',
                url: '/volunteers/' + volunteerId
            }).then(function(response){
                return response.data
            }, function(errorResponse){
                return errorResponse.data
            });
        }

}
}]);