(function () {
  'use strict';

  angular
    .module('app')
    .controller('PreparationController', PreparationController);

  PreparationController.$inject = ['$scope', '$http', '$rootScope', '$localStorage'];

  function PreparationController($scope, $http, $rootScope, $localStorage) {

    console.log("PreparationController initialized");
    

    $scope.preparationReady = 'no';
    

    /*
    console.log(JSON.parse(JSON.stringify($localStorage.newFeedbackResult)));
    $localStorage.idFeedback = JSON.parse(JSON.stringify($localStorage.newFeedbackResult).idFeedback);
    $scope.idFeedback = $localStorage.idFeedback;
    console.log($localStorage.idFeedback);
    */

    $scope.newFeedbackResult = $localStorage.newFeedbackResult;
    console.log($scope.newFeedbackResult.idFeedback);
    $scope.idFeedback = $scope.newFeedbackResult.idFeedback;

    $scope.changePreparationEnd = function(){
      console.log("cambié");
      console.log($scope.preparationReady);
      $scope.newFeedbackResult.preparationEnd = $scope.preparationReady;

    }

    $http.get('/api/feedbacksInformation/' + $scope.newFeedbackResult.idFeedback)
    .then(function(response) {      
      $scope.preparation = response.data[0].preparation;
      $localStorage.checks = response.data[0].checks;
      //$scope.checks = response.data[0].checks;
      console.log($localStorage.checks);
      $localStorage.punctuation = response.data[0].punctuation;
      console.log($localStorage.punctuation);
    })
    .catch(function(response) {
      console.error('Show preparation error', response.status, response.data);
    })
    .finally(function() {
      console.log("Preparation showed");
    });

    
    $scope.modifyPreparationEnd = function(){
      $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.newFeedbackResult.student, $scope.newFeedbackResult)
				.then(function(response) {
					console.log('all perfect');
				})
				.catch(function(response) {
					console.error('Error', response.status, response.data);
				})
				.finally(function() {
					console.log("Finished");
				});
    }

  }

}());