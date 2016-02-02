var app = angular.module('chrCalendarApp', ['ngRoute','mwl.calendar','ui.bootstrap', 'ui.bootstrap.datetimepicker', 'rzModule', 'customFilters']);

app.config(function($routeProvider){
  $routeProvider
    .when('/',{
      controller: 'userCal',
      templateUrl: 'views/templates/userCal.html'
    })
    .when('/userEvent/:id',{
      controller: 'userEvent',
      templateUrl: 'views/templates/userEvent.html'
    })
    .when('/adminCal', {
      controller: 'adminCal',
      templateUrl: 'views/templates/adminCal.html'
    })
    .when('/adminEvent/:id?',{
      controller: 'adminEvent',
      templateUrl: 'views/templates/adminEvent.html'
    })
    .when('/volunteerList/:id',{
      controller: 'volunteerList',
      templateUrl: 'views/templates/volunteerList.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});