/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope','$routeParams','eventServe', 'taskServe', 'shiftServe', '$location', 'copyServe',
  '$timeout', function($scope, $routeParams, eventServe, taskServe, shiftServe, $location, copyServe, $timeout){

    /**
     * Array to hold list of Tasks for a specific Event ID
     * @type {Array}
   */
    $scope.tasks = [];

		/**
     * Function to make call to database for event, task, and shift information for a specific Event ID
     */
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

		/**
     * Function to save new event or update existing event in the database
     */
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

		/**
     * Object for date data to copy event
     * @type {{startsAt: string, endsAt: string}}
     */
    $scope.copiedEvent = {
      startsAt: "",
      endsAt: ""
    };

		/**
     * Function to copy event to new dates
     */
    $scope.copyEvent = function() {
      copyServe.copyEvent($routeParams.id, $scope.copiedEvent.startsAt, $scope.copiedEvent.endsAt)
        .then(function(response) {
          $location.path('/adminEvent/' + response._id);
        });
    };

		/**
     * Functions deletes an event from the database
     */
    $scope.removeEvent = function() {
      eventServe.deleteEvent($scope.event._id).then(function(response){
        $location.path('/adminCal');
        console.log(response);
      })
    };

		/**
     * object contains data fields to create a new task
     * @type {{name: string, description: string, event_id: *}}
     */
    $scope.newTask = {
        name: '',
        description: '',
        event_id: $routeParams.id
    };

		/**
     * Function saves a new task to the database
     */
    $scope.saveNewTask = function(){
        taskServe.createTask($scope.newTask).then(function(response){
            $scope.clearNewTask();
            taskServe.getTasks($routeParams.id).then(function(response){
                $scope.tasks = response;
            });
        $scope.loadAdminEvent();
        });
    };

		/**
     * Function to reset the newTask object
     */
    $scope.clearNewTask = function(){
        $scope.newTask.name = '';
        $scope.newTask.description = '';
    };

		/**
     * Function to update existing task in the database
     * @param taskId
     * @param task
     */
    $scope.editTask = function(taskId, task) {
      taskServe.updateTask(taskId, task)
        .then(function() {
          $scope.loadAdminEvent();
        })
    };

		/**
     * Function to delete a specific task from the database
     * @param taskId
     */
    $scope.deleteTask = function(taskId) {
      taskServe.deleteTask(taskId)
        .then(function() {
          $scope.loadAdminEvent();
        })
    };

    /**
     * Object holds data for a new shift being created
     * @type {{date: string, startTime: string, endTime: string, slotsAvailable: string, task_id: string, task_name: string}}
		 */
    $scope.newShift = {
        date: "",
        startTime: "",
        endTime: "",
        slotsAvailable: "",
        task_id: "",
        task_name: ""
    };

		/**
     * variables controlling shift creation
     * @type {string}
     */
    $scope.shiftLength = "";
    $scope.shiftSlots = "";
    $scope.shiftDate = "";

		/**
     * Function saves a series of new shifts to the database
     * @param taskId
     * @param taskName
     * @param index
     * @param shiftLength
     * @param shiftSlots
     * @param shiftDate
		 */
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
        }
        $scope.loadAdminEvent();
    };

		/**
     * Function deletes shift from the database
     * @param shiftId
     */
    $scope.deleteShift = function(shiftId) {
      shiftServe.deleteShift(shiftId);
      $scope.loadAdminEvent();
    };

		/**
     * Function to re-render the slider inside shift creation modal so it displays properly
     */
    $scope.refreshSlider = function () {
      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
    };
}]);

