/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope','$routeParams','eventServe', 'taskServe', 'shiftServe', '$location', 'copyServe',
    function($scope, $routeParams, eventServe, taskServe, shiftServe, $location, copyServe){

    /**
     * Array to hold list of Tasks for a specific Event ID
     * @type {Array}
   */
    $scope.tasks = [];

    $scope.loadAdminEvent = function(){
      eventServe.getEvent($routeParams.id).then(function(response){
        $scope.event = response;
        taskServe.getTasks($routeParams.id).then(function(response){
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
            };
            shiftServe.getShifts(element._id).then(function(response) {
              element.shifts = response;
            })
          });
        });
      });
    };


  /**
   * If an event ID is passed to the URL. This pulls down the information for a specific Event
   */
    if($routeParams.id){
        $scope.loadAdminEvent();
    } else {
        $scope.event = {
            title: "",
            startsAt: "",
            endsAt: "",
            description: "",
            host: ""
        };
    }

    $scope.saveEvent = function (){
        if($scope.event._id){
            eventServe.updateEvent($scope.event._id, $scope.event)
        } else{
            eventServe.createEvent($scope.event).then(function(response){
              $scope.eventResponse = response;
              var route = '/adminEvent/' + response._id;
              $location.path(route);
            })
        }

    };

    $scope.copiedEvent = {
      startsAt: "",
      endsAt: ""
    };

    $scope.copyEvent = function() {
      copyServe.copyEvent($routeParams.id, $scope.copiedEvent.startsAt, $scope.copiedEvent.endsAt)
        .then(function(response) {
          $location.path('/adminEvent/' + response._id);
        });
    };

    $scope.newTask = {
        name: '',
        description: '',
        event_id: $routeParams.id
    };

    $scope.saveNewTask = function(){
        taskServe.createTask($scope.newTask).then(function(response){
            $scope.clearNewTask();
            taskServe.getTasks($routeParams.id).then(function(response){
                $scope.tasks = response;
            });
        $scope.loadAdminEvent();
        });
    };

    $scope.clearNewTask = function(){
        $scope.newTask.name = '';
        $scope.newTask.description = '';
    };

    $scope.editTask = function(taskId, task) {
      taskServe.updateTask(taskId, task)
        .then(function() {
          $scope.loadAdminEvent();
        })
    };

    $scope.deleteTask = function(taskId) {
      taskServe.deleteTask(taskId)
        .then(function() {
          $scope.loadAdminEvent();
        })
    }


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
        $scope.newShift.slotsUsed = 0;

        for(var i = 0; i<(end-start)/length; i++) {
            $scope.newShift.startTime = start + (i * length);
            $scope.newShift.endTime = $scope.newShift.startTime + length;
            shiftServe.createShift(angular.copy($scope.newShift));
        };
        $scope.loadAdminEvent();
    };

    $scope.deleteShift = function(shiftId) {
      shiftServe.deleteShift(shiftId);
      $scope.loadAdminEvent();
    }
}]);

