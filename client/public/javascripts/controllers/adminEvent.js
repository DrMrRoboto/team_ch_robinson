/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope','$routeParams','eventServe', 'taskServe', 'shiftServe',
    function($scope, $routeParams, eventServe, taskServe, shiftServe){

    if($routeParams.id){
        eventServe.getEvent($routeParams.id).then(function(response){
            $scope.event = response;
            console.log($scope.event);
        });
    } else {
        $scope.event = {
            title: "",
            startsAt: "",
            endsAt: "",
            description: "",
            host: ""
        };
        console.log($scope.event);
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
        if($scope.event._id){
            eventServe.updateEvent($scope.event._id, $scope.event)
        } else{
            eventServe.createEvent($scope.event).then(function(response){
                $scope.eventResponse = response;
            });
        }

    }

}]);

