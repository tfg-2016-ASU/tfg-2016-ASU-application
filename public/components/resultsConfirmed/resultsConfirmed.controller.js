(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResultsConfirmedController', ResultsConfirmedController);

  ResultsConfirmedController.$inject = ['$scope', '$localStorage', '$http'];

  function ResultsConfirmedController($scope, $localStorage, $http) {
	
    console.log("ResultsConfirmedController initialized");
	
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.student = $localStorage.newFeedbackResult.student;

    console.log($localStorage.firstReviewer == $localStorage.newFeedbackResult.student);

    $scope.confirmed = ($localStorage.firstReviewer == $localStorage.newFeedbackResult.student);

    console.log($localStorage.RWDEF.reviewer);
    $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.RWDEF.reviewer)
      .then(function(response) {
        console.log('get perfect');

        console.log(response.data[0]);
        response.data[0].waiting = 'si';
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.RWDEF.reviewer, response.data[0])
        .then(function(response) {
          console.log('put perfect');
          console.log(response.data[0]);
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          console.log("Finished");
        });


      })
      .catch(function(response) {
        console.error('Error', response.status, response.data);
      })
      .finally(function() {
        console.log("Finished");
      });

  }

}());