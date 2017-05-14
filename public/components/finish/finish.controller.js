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
      $scope.arrayCheckResults = response.data[0].arrayCheckResults;
      console.log($scope.arrayCheckResults);

      var arrayCheckResultsLength = $scope.arrayCheckResults.length;
      var i;
      var score = 0;
      for(i=0; i<arrayCheckResultsLength-1; i++){
        score = score + $scope.arrayCheckResults[i].punctuation;
      }

      $scope.score = score;
      console.log($scope.score);

    })
    .catch(function(response) {
      console.error('Show arrayCheckResults error', response.status, response.data);
    })
    .finally(function() {
      console.log("arrayCheckResults showed");
    });
    

  }

}());