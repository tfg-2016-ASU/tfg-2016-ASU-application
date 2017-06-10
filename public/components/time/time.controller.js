(function () {
  'use strict';

  angular
    .module('app')
    .controller('TimeController', TimeController);

  TimeController.$inject = ['$scope', '$interval', '$localStorage'];

  function TimeController($scope, $interval, $localStorage) {
	
    console.log("TimeController initialized");

    //var countDownDate = new Date("Jun 9, 2017 15:37:25").getTime();
    

    var countDownDate = new Date();
    console.log(countDownDate);
    countDownDate.setMinutes(countDownDate.getMinutes()+5);
    console.log(countDownDate);
    countDownDate = countDownDate.getTime();

    $scope.lessOneMinute = false;
    $scope.lessTenSeconds = false;

    // Update the count down every 1 second
   
    var tick = function() {
			// Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        //document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
        $scope.clock = minutes + "m " + seconds + "s ";
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            $scope.clock = "EXPIRED";
        }
        if (minutes < 1) {
            $scope.lessOneMinute = true;
        }
        if (minutes < 1 && seconds < 10) {
            $scope.lessTenSeconds = true;
        }

		}
		tick();
		$interval(tick, 1000);

  }

}());