/**
 * Created by chottinger on 1/21/16.
 */
app.controller('userCal', ['$scope','moment', 'calendarConfig',git
  function($scope, moment, calendarConfig, eventAjax){

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  calendarConfig.templates.calendarMonthCell = 'views/templates/test.html';

  $scope.eventData = [
    {
      title: 'Event ID 1',
      type: 'info',
      startsAt: new Date(2016, 1, 12, 15),
      endsAt: new Date(2016, 1, 12, 16),
      id: 1
    },
    {
      title: 'Event ID 2',
      type: 'info',
      startsAt: new Date(2016, 1, 12, 15),
      endsAt: new Date(2016, 1, 12, 16),
      id: 2
    },
    {
      title: 'Event ID 3',
      type: 'info',
      startsAt: new Date(2016, 1, 12, 15),
      endsAt: new Date(2016, 1, 12, 16),
      id: 3
    },
    {
      title: 'Event ID 4',
      type: 'info',
      startsAt: new Date(2016, 1, 12, 15),
      endsAt: new Date(2016, 1, 12, 16),
      id: 4
    }
  ];

  $scope.view = 'month';

  $scope.viewDate = new Date(2016, 1, 1, 0);

  $scope.viewTitle = monthNames[$scope.viewDate.getMonth()];


}]);