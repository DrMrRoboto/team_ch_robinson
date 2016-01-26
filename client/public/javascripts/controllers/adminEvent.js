/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope',function($scope){

    $scope.mydate='';

    $scope.isOpen = false;

    $scope.openCalendar = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.isOpen = true;
    };

}]);

//app.controller('adminEvent',['$scope',function($scope){
//
//    $scope.isOpen = false;
//
//    $scope.openCalendar = function(e) {
//        e.preventDefault();
//        e.stopPropagation();
//
//        $scope.isOpen = true;
//    };
//
//}]);