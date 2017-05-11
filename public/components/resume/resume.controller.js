(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResumeController', ResumeController);

  ResumeController.$inject = ['$scope', '$localStorage'];

  function ResumeController($scope, $localStorage) {
	
    console.log("ResumeController initialized");
	/*
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.checks = $localStorage.reviewedFeedbackResult.arrayCheckResults;

    $scope.goToTheCheck = function (idCheck){
      $localStorage.checkToImprove = idCheck;
      console.log(idCheck);
      //$localStorage.nextCheck();
    }
*/
  }

}());