(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResultsConfirmedController', ResultsConfirmedController);

  ResultsConfirmedController.$inject = ['$scope', '$localStorage', '$http', '$interval', '$state', '$stateParams'];

  function ResultsConfirmedController($scope, $localStorage, $http, $interval, $state, $stateParams) {
	
    console.log("ResultsConfirmedController initialized");

    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition;  
	
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.student = $localStorage.studentLogged;
    $scope.role = $localStorage.role;

    //console.log($localStorage.newFeedbackResult.arrayCheckResults.length>0);

    //$scope.confirmed = ($localStorage.firstReviewer == $localStorage.newFeedbackResult.student);
    //$scope.confirmed = ($localStorage.newFeedbackResult.arrayCheckResults.length>0);
  
    //$scope.confirmed = $localStorage.resultsConfirmed;
    /*
    console.log($localStorage.rw);
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
    */

  }

}());