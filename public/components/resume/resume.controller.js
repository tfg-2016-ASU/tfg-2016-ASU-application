(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResumeController', ResumeController);

  ResumeController.$inject = ['$scope', '$localStorage', '$interval'];

  

  function ResumeController($scope, $localStorage, $interval) {
	
    console.log("ResumeController initialized");

  
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