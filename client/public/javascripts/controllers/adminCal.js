/**
 * Created by chottinger on 1/21/16.
 */
app.controller('adminCal', ['$scope','moment', 'calendarConfig','eventServe', '$location',
    function($scope, moment, calendarConfig, eventServe, $location){

    eventServe.getEvents().then(function(response){
        $scope.eventData = response
        $scope.pastEvents = getPastEvents(response);
        $scope.futureEvents = getFutureEvents(response)
    });

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    calendarConfig.templates.calendarMonthCell = 'views/templates/adminMonthDayViewTemplate.html';
        /**
         * Sets calendar scope
         */
    $scope.view = 'month';

    $scope.viewDate = new Date(moment());

    $scope.viewTitle = monthNames[$scope.viewDate.getMonth()];

    /**
     * Uses moment() to create awareness within the calendar of the current date/time.
     */
    $scope.rightNow = function(){
        return moment();
    };


        /**
         * This function creates an empty array for events that occur before the current
         * date so that they can be accessed to display on the Previous Events list.
         */
    var getPastEvents = function(events) {
        var pastEvents = [];
        for (event of events){
            if (event.startsAt < moment()){
                pastEvents.push(event);
            }
        }
        return pastEvents;
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

    $scope.eventClicked = function(event) {
        $location.path('/adminEvent/' + event._id)
    };

}]);