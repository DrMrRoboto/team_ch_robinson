/**
 * Created by chottinger on 1/21/16.
 */
app.controller('userEvent', ['$scope', '$http', function ($scope, $http) {

    $scope.volunteer = {};
    $scope.volunteers = [];
    var fetchVolunteers = function() {
        return $http.get('/userEvent').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed');
            }
            $scope.volunteer = {};
            $scope.volunteers = response.data;
            return response.data;
        })
    };

    $scope.insert = function(newVolunteer) {
        $http({
            url: '/userEvent',
            method: 'post',
            data: volunteer
        }).then(function(response){
            $scope.volunteer = {};
        });
    };
}]);