(function () {
  'use strict';

  angular
    .module('app')
    .controller('WaitingConfirmationController', WaitingConfirmationController);

  WaitingConfirmationController.$inject = ['$scope', '$http', '$localStorage', '$location'];

  function WaitingConfirmationController($scope, $http, $localStorage, $location) {
	
    console.log("WaitingConfirmationController initialized");
    
    $scope.refreshConfirmed = function(){
      $http.get('/api/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student)
      .then(function(response) {      
        console.log(response.data[0].confirmed);

        if(response.data[0].confirmed==2){
           $location.path('/resultsConfirmed');
        }


      })
      .catch(function(response) {
        console.error('Show preparation error', response.status, response.data);
      })
      .finally(function() {
        console.log("Preparation showed");
      });
    }

    

  }

}());