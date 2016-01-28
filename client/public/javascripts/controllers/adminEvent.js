/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope','$routeParams','eventServe', 'taskServe', 'shiftServe',
    function($scope, $routeParams, eventServe, taskServe, shiftServe){

    if($routeParams.id){
        eventServe.getEvent($routeParams.id).then(function(response){
            $scope.event = response;
            taskServe.getTasks($routeParams.id).then(function(response){
                $scope.tasks = response;
            });
        });
    } else {
        $scope.event = {
            title: "",
            startsAt: "",
            endsAt: "",
            description: "",
            host: ""
        };
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

    };

    $scope.newTask = {
        name: '',
        desc: '',
        Event_id: $routeParams.id
    };

    $scope.saveNewTask = function(){
        taskServe.createTask($scope.newTask).then(function(response){
            $scope.newTask.name = '';
            $scope.newTask.desc = '';
            taskServe.getTasks($routeParams.id).then(function(response){
                $scope.tasks = response;
            });
        });
    };

    $scope.clearNewTask = function(){

    };

}]);

