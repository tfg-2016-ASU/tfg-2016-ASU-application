(function () {
  'use strict';

  angular
    .module('app')
    .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['$scope', '$localStorage', '$http', '$location'];

  function WaitingController($scope, $localStorage, $http, $location) {
	
    console.log("WaitingController initialized");
	
    $scope.idFeedback = $localStorage.idFeedback;

    $scope.reviewer = $localStorage.RWDEF.student;
    
    console.log($localStorage.RWDEF.reviewer);
    
    $scope.beginReview = function(){
        //si waiting es 'no' enconces entro en el if y voy a la pantalla siguiente
        console.log($localStorage.student);
        $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.RWDEF.reviewer)
        .then(function(response) {      
          $scope.waiting = response.data[0].waiting;
          console.log($scope.waiting);
          if($scope.waiting == 'no'){
            $location.path('/confirmMyResult');
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