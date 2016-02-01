/**
 *
 * Created by chottinger on 1/21/16.
 */
app.controller('userCal', ['$scope','moment', 'calendarConfig', 'eventServe',
  function($scope, moment, calendarConfig, eventServe){

  //sets eventData, but only after $http call in getEvents() is complete
  eventServe.getEvents().then(function(response){
    $scope.eventData = response;
    console.log($scope.eventData)
  });

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  calendarConfig.templates.calendarMonthCell = 'views/templates/userMonthDayViewTemplate.html';

  $scope.view = 'month';

  $scope.viewDate = new Date(moment());

  $scope.viewTitle = monthNames[$scope.viewDate.getMonth()];

  $scope.now = moment();

}]);