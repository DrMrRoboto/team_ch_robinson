/**
 *
 * Created by chottinger on 1/21/16.
 */
app.controller('userCal', ['$scope','moment', 'calendarConfig', 'eventServe', '$location',
  function($scope, moment, calendarConfig, eventServe, $location){

  //sets eventData, but only after $http call in getEvents() is complete
  eventServe.getEvents().then(function(response){
    $scope.eventData = response;
    $scope.futureEvents = getFutureEvents(response)
  });

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  calendarConfig.templates.calendarMonthCell = 'views/templates/userMonthDayViewTemplate.html';

  //configures calendar view to be monthly

  $scope.view = 'month';

    /**
     * Sets calendarView to current month
     */

  $scope.viewDate = new Date(moment());

  //gets month and converts it to a string using monthNames array
  $scope.viewTitle = monthNames[$scope.viewDate.getMonth()];

    //$scope.now is called within admin/user calendarView pages so that upcoming
    //and previous events are displayed within the context of 'today'
  $scope.now = new Date(moment());

  //links to specific event page when event is clicked
  $scope.eventClicked = function(event) {
    $location.path('/userEvent/' + event._id)
  };

    /**
     * Uses moment() to create awareness within the calendar of the current date/time.
     */
  $scope.thisMonth = function(){
    $scope.viewDate = $scope.now;
  };
    /**
     * This function creates an empty array for events that occur after the current
     * date so that they can be accessed to display on the Upcoming Events list.
     */
  var getFutureEvents = function(events){
    var futureEvents = [];
    for (event of events){
      if (event.startsAt >= moment()){
        futureEvents.push(event);
      }
    }
    return futureEvents;
  };

}]);