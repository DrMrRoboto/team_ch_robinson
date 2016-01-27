/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminEvent',['$scope',function($scope){

    $scope.event = {
        title: "",
        startsAt: "",
        endsAt: "",
        description: "",
        host: ""
    }


    $scope.startAtOpen = false;
    $scope.endAtOpen = false;

    $scope.openStartAt = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.startAtOpen = true;
    };
    $scope.openEndAt = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.endAtOpen = true;
    };

}]);

