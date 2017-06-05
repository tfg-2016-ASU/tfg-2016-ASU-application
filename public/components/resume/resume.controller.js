(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResumeController', ResumeController);

  ResumeController.$inject = ['$scope', '$localStorage', '$interval'];

  

  function ResumeController($scope, $localStorage, $interval) {
	
    console.log("ResumeController initialized");

    //---------  Timer-------------------
    var d;
    d = new Date($localStorage.clock);
    
    var tick = function() {
        $scope.clock = d;
        d.setSeconds(d.getSeconds() + 1);
    }
    tick();
    $interval(tick, 1000);
    //-----------------------------------
	
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.checks = $localStorage.reviewedFeedbackResult.arrayCheckResults;
    $localStorage.arrayCheckResults = $localStorage.reviewedFeedbackResult.arrayCheckResults;;
    
    $scope.improveCheck = function(idCheck){
      $localStorage.currentCheck = idCheck;
    }

  }

}());