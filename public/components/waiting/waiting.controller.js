(function () {
  'use strict';

  angular
    .module('app')
    .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['$scope', '$localStorage', '$http', '$location'];

  function WaitingController($scope, $localStorage, $http, $location) {
	
    console.log("WaitingController initialized");
	
    $scope.idFeedback = $localStorage.idFeedback;
    console.log($localStorage.idFeedback);  


    $scope.beginReview = function(){
        //comprobar que el waiting vale 'si'
        console.log($localStorage.student);
        $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.student)
        .then(function(response) {      
          $scope.waiting = response.data[0].waiting;
          console.log($scope.waiting);
          if($scope.waiting == 'si'){
            $location.path('/checksSwipe');
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