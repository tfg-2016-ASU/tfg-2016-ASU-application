(function () {
  'use strict';

  angular
    .module('app')
    .controller('WaitingConfirmationController', WaitingConfirmationController);

  WaitingConfirmationController.$inject = ['$scope', '$http', '$localStorage', '$location', '$interval', '$state', '$stateParams'];

  function WaitingConfirmationController($scope, $http, $localStorage, $location, $interval, $state, $stateParams) {
	
    console.log("WaitingConfirmationController initialized");

    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition;  

    $scope.idFeedback = $localStorage.idFeedback; 
    
    $scope.refreshConfirmed = function(){
      $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student)
      .then(function(response) {      
        console.log(response.data[0].confirmed);

        if(response.data[0].confirmed==2){
           $state.go('resultsConfirmed', {subject: $scope.subject, edition: $scope.edition})
        }


      })
      .catch(function(response) {
        console.error('Show preparation error', response.status, response.data);
      })
      .finally(function() {
      });
    }

    

  }

}());