(function () {
  'use strict';

  angular
    .module('app')
    .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['$scope', '$localStorage', '$http'];

  function WaitingController($scope, $localStorage, $http) {
	
    console.log("WaitingController initialized");
	
    $scope.idFeedback = $localStorage.idFeedback;


    $scope.beginReview = function(){
        //comprobar que el waiting vale 'no'
        console.log($localStorage.student);
        $http.get('/api/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.student)
        .then(function(response) {      
          $scope.waiting = response.data[0].waiting;
          console.log($scope.waiting);
          if($scope.waiting == 'no'){
            $location.path('/checksV2');
          }
        })
        .catch(function(response) {
          console.error('error', response.status, response.data);
        })
        .finally(function() {
          console.log("finished");
        });

    }

  }

}());