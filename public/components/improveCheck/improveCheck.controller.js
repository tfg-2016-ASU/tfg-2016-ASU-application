(function () {
  'use strict';

  angular
    .module('app')
    .controller('ImproveCheckController', ImproveCheckController);

  ImproveCheckController.$inject = ['$scope', '$localStorage', '$location'];

  function ImproveCheckController($scope, $localStorage, $location) {
	/*
    console.log("ImproveCheckController initialized");

    $scope.checkToImprove = $localStorage.checkToImprove;
    console.log($scope.checkToImprove);
    $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.checkToImprove].result = 'OK';
    console.log($localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.checkToImprove].result);
    console.log($localStorage.reviewedFeedbackResult);
     */

  }

}());