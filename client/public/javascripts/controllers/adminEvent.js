/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope','$routeParams','eventServe', 'taskServe', 'shiftServe',
    function($scope, $routeParams, eventServe, taskServe, shiftServe){

    $scope.tasks = [];

    if($routeParams.id){
        eventServe.getEvent($routeParams.id).then(function(response){
            $scope.event = response;
            taskServe.getTasks($routeParams.id).then(function(response){
                console.log(response);
                $scope.tasks = response;
                $scope.tasks.forEach(function(element){
                    element.slider = {
                        min: 0,
                        max: 1440,
                        options: {
                            floor:0,
                            ceil:1440,
                            step: 30,
                            draggableRange: true,
                            minRange: 30,
                            showSelectionBar: true,
                            showSelectionBarEnd: true,
                            hideLimitLabels: true
                        }
                    }
                });
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
        description: '',
        event_id: $routeParams.id
    };

    $scope.saveNewTask = function(){
        console.log($scope.newTask);
        taskServe.createTask($scope.newTask).then(function(response){
            console.log(response);
            $scope.clearNewTask();
            taskServe.getTasks($routeParams.id).then(function(response){
                $scope.tasks = response;
                console.log($scope.tasks);
            });
        });
    };

    $scope.clearNewTask = function(){
        $scope.newTask.name = '';
        $scope.newTask.description = '';
    };




    $scope.tasks.slider = {
        min: 0,
        max: 1440,
        options: {
            floor:0,
            ceil:1440,
            step: 30,
            draggableRange: true,
            minRange: 30,
            showSelectionBar: true,
            showSelectionBarEnd: true,
            hideLimitLabels: true
        }
    };


}]);

