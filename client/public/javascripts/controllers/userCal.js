/**
 * Created by chottinger on 1/21/16.
 */
app.controller('userCal', ['$scope','moment',function($scope, moment){
  $scope.eventData = [
    {
      title: 'Bring your children as slaves day',
      type: 'info',
      startsAt: moment().startOf('month').toDate()
    }
  ];

  $scope.view = 'month';

  $scope.viewDate = moment().startOf('month').toDate();

  console.log($scope.viewDate);

}]);