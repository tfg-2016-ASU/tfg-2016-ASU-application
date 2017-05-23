(function () {
  'use strict';

  angular
    .module('app')
    .controller('ExpectingConfirmationController', ExpectingConfirmationController);

  ExpectingConfirmationController.$inject = ['$scope', '$localStorage', '$location', '$http'];

  function ExpectingConfirmationController($scope, $localStorage, $location, $http) {
	
    console.log("ExpectingConfirmationController initialized");
	
  
    $scope.idFeedback = $localStorage.idFeedback;
    console.log($localStorage.student);
    console.log($localStorage.idFeedback);

     $http.get('/api/feedbacksResults/1/manuela')
      .then(function(response) {
        console.log(perfect);
      })
      .catch(function(response) {
        console.error('Error', response.status, response.data);
      })
      .finally(function() {
        console.log("Finished");
      });

    $scope.refreshConfirmed = function(){

    }  
    
  }

}());