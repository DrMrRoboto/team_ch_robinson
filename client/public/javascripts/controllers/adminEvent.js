/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope','eventServe', 'taskServe', 'shiftServe',
    function($scope, eventServe, taskServe, shiftServe){

    $scope.event = {
        title: "",
        startsAt: "",
        endsAt: "",
        description: "",
        host: ""
    }


    $scope.startAtOpen = false;
    $scope.endAtOpen = false;

    $scope.openStartAt = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.startAtOpen = true;
    };
    $scope.openEndAt = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.endAtOpen = true;
    };

    $scope.saveEvent = function (){
        eventServe.createEvent($scope.event);
    }

}]);

