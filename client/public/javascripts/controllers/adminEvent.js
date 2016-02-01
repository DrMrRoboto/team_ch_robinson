/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope','$routeParams','eventServe', 'taskServe', 'shiftServe',
    function($scope, $routeParams, eventServe, taskServe, shiftServe){

    /**
     * Array to hold list of Tasks for a specific Event ID
     * @type {Array}
   */
    $scope.tasks = [];

  /**
   * If an event ID is passed to the URL. This pulls down the information for a specific Event
   */
    if($routeParams.id){
        eventServe.getEvent($routeParams.id).then(function(response){
            $scope.event = response;
            taskServe.getTasks($routeParams.id).then(function(response){
                console.log(response);
                $scope.tasks = response;
                $scope.tasks.forEach(function(element){
                    element.slider = {
                        min: 480,
                        max: 1020,
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
    $scope.shiftDateOpen = false;

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
    $scope.openShiftDate= function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.shiftDateOpen = true;
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


    $scope.newShift = {
        date: "",
        startTime: "",
        endTime: "",
        slotsAvailable: "",
        task_id: "",
        task_name: ""
    };

        $scope.shiftLength = "";
        $scope.shiftSlots = "";
        $scope.shiftDate = "";

    $scope.saveNewShift = function(taskId, taskName, index, shiftLength, shiftSlots, shiftDate) {

        var start = $scope.tasks[index].slider.min;
        var end = $scope.tasks[index].slider.max;
        var length = parseInt(shiftLength);

        $scope.newShift.date = shiftDate;
        $scope.newShift.slotsAvailable = shiftSlots;
        $scope.newShift.task_id = taskId;
        $scope.newShift.task_name = taskName;

        for(var i = 0; i<(end-start)/length; i++) {
            $scope.newShift.startTime = start + (i * length);
            $scope.newShift.endTime = $scope.newShift.startTime + length;
            console.log($scope.newShift);
            shiftServe.createShift(angular.copy($scope.newShift));
        }
    };
}]);

