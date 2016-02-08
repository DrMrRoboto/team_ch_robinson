/**
 *
 * Created by chottinger on 1/21/16.
 */
"use strict";
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

  $scope.view = 'month';

    //sets calendarView to current month
  $scope.viewDate = new Date(moment());


  $scope.viewTitle = monthNames[$scope.viewDate.getMonth()];

    //$scope.now is called within admin/user calendarView pages so that upcoming
    //and previous events are displayed within the context of 'today'
  $scope.now = new Date(moment());

  $scope.eventClicked = function(event) {
    $location.path('/userEvent/' + event._id)
  };

  $scope.thisMonth = function(){
    $scope.viewDate = $scope.now;
  };

  var getFutureEvents = function(events){
    var futureEvents = [];
    for (event of events){
      if (event.startsAt >= moment()){
        futureEvents.push(event);
      };
    };
    return futureEvents;
  };

}]);