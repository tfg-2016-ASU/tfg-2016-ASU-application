(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResumeController', ResumeController);

  ResumeController.$inject = ['$scope', '$localStorage'];

  

  function ResumeController($scope, $localStorage) {
	
    console.log("ResumeController initialized");

    
	
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.checks = $localStorage.reviewedFeedbackResult.arrayCheckResults;
    
    $scope.improveCheck = function(idCheck){
      $localStorage.currentCheck = idCheck;
    }

  }

}());