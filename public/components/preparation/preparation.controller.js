(function () {
  'use strict';

  angular
    .module('app')
    .controller('PreparationController', PreparationController);

  PreparationController.$inject = ['$scope', '$http', '$rootScope', '$localStorage'];

  function PreparationController($scope, $http, $rootScope, $localStorage) {

    console.log("PreparationController initialized");

    /*
    console.log(JSON.parse(JSON.stringify($localStorage.newFeedbackResult)));
    $localStorage.idFeedback = JSON.parse(JSON.stringify($localStorage.newFeedbackResult).idFeedback);
    $scope.idFeedback = $localStorage.idFeedback;
    console.log($localStorage.idFeedback);
    */

    $scope.newFeedbackResult = $localStorage.newFeedbackResult;
    console.log('A: ' + $scope.newFeedbackResult);
    $scope.idFeedback = $scope.newFeedbackResult.idFeedback;
    

    $http.get('/api/feedbacksInformation/' + $scope.idFeedback)
    .then(function(response) {      
      $scope.preparation = response.data[0].preparation;
      $localStorage.checks = response.data[0].checks;
      //$scope.checks = response.data[0].checks;
      
    })
    .catch(function(response) {
      console.error('Show preparation error', response.status, response.data);
    })
    .finally(function() {
      console.log("Preparation showed");
    });
    
  }

}());