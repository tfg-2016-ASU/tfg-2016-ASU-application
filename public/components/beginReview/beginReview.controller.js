(function () {
  'use strict';

  angular
    .module('app')
    .controller('BeginReviewController', BeginReviewController);

  BeginReviewController.$inject = ['$scope', '$localStorage', '$http', '$interval'];

  function BeginReviewController($scope, $localStorage, $http, $interval) {
	
    console.log("BeginReviewController initialized");

	
    $scope.idFeedback = $localStorage.idFeedback;
    console.log($localStorage.rw);
    //console.log($localStorage.RWDEF.student);

    /*$http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.RWDEF.student)
    .then(function(response) {
      response.data[0].waiting = 'si';
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.RWDEF.student, response.data[0])
        .then(function(response) {
  
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          
        });
    })
    .catch(function(response) {
      console.error('Error', response.status, response.data);
    })
    .finally(function() {
      
    });*/

  }

}());