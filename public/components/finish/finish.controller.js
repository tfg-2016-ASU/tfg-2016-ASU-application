(function () {
  'use strict';

  angular
    .module('app')
    .controller('FinishController', FinishController);

  FinishController.$inject = ['$scope', '$rootScope', '$localStorage', '$http'];

  function FinishController($scope, $rootScope, $localStorage, $http) {
	
    console.log("FinishController initialized");

    $scope.idFeedback = $localStorage.idFeedback;
    
    $http.get('/api/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.studentReviewed)
    .then(function(response) {    
      $scope.feedbackFinished = response.data[0];
      $scope.arrayCheckResults = response.data[0].arrayCheckResults;
    
      $localStorage.result = 'POSITIVO';
      $localStorage.score = $localStorage.punctuation;

      

      var arrayCheckResultsLength = $scope.arrayCheckResults.length;
      var i;
      for(i=0; i<arrayCheckResultsLength; i++){
       
        if($scope.arrayCheckResults[i].result == 'no'){
          $localStorage.result = 'NEGATIVO';
          $localStorage.score = 0;
         
          break;
        }
      }

      $scope.feedbackFinished.result = $localStorage.result;
      $scope.feedbackFinished.score = $localStorage.score;
     


      console.log($scope.idFeedback);
      console.log($localStorage.studentReviewed);
      console.log($scope.feedbackFinished);
      $scope.feedbackFinished.shift = 'jeje';

      $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentReviewed, $scope.feedbackFinished)
				.then(function(response) {
					console.log('put perfect');
				})
				.catch(function(response) {
					console.error('Error', response.status, response.data);
				})
				.finally(function() {
					console.log("Finished");
				});

    })
    .catch(function(response) {
      console.error('Show arrayCheckResults error', response.status, response.data);
    })
    .finally(function() {
      console.log("arrayCheckResults showed");
    });
    

  }

}());