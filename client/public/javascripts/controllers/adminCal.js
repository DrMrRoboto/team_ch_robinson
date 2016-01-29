/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminCal', ['$scope','moment', 'calendarConfig','eventServe',
    function($scope, moment, calendarConfig, eventServe){

    eventServe.getEvents().then(function(response){
        $scope.eventData = response;
    });

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    calendarConfig.templates.calendarMonthCell = 'views/templates/adminMonthDayViewTemplate.html';

    $scope.view = 'month';

    $scope.viewDate = new Date(2016, 0, 1, 0);

    $scope.viewTitle = monthNames[$scope.viewDate.getMonth()];


}]);