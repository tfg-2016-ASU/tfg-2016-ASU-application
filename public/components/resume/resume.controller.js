(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResumeController', ResumeController);

  ResumeController.$inject = ['$scope', '$localStorage', '$interval', '$state','$stateParams'];

  

  function ResumeController($scope, $localStorage, $interval, $state, $stateParams) {
	
    console.log("ResumeController initialized");

    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition;  


    //------------Countdown--------------
    $scope.lessOneMinute = false;
    $scope.lessTenSeconds = false;
    var countDownDate = $localStorage.countDownDate;
    var tick = function() {
      var now = new Date().getTime();
          var distance = countDownDate - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      $scope.clock = minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(tick);
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
    //-----------------------------------
    

    console.log($localStorage.checks);
    $scope.checksTitle = $localStorage.checks;
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.checks = $localStorage.reviewedFeedbackResult.arrayCheckResults;
    $localStorage.arrayCheckResults = $localStorage.reviewedFeedbackResult.arrayCheckResults;

    var i;
    for(i=0; i<$scope.checksTitle.length; i++){
      if($scope.checks[i] != undefined){
        $scope.checksTitle[i]["result"] = $scope.checks[i].result;
      }else{
        $scope.checksTitle[i]["result"] = '-'
      }
    }
    console.log($scope.checksTitle);
	


    
    
    $scope.improveCheck = function(idCheck){
      $localStorage.currentCheck = idCheck;
    }

  }

}());