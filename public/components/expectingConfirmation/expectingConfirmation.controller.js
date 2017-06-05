(function () {
  'use strict';

  angular
    .module('app')
    .controller('ExpectingConfirmationController', ExpectingConfirmationController);

  ExpectingConfirmationController.$inject = ['$scope', '$localStorage', '$location', '$http', '$interval'];

  function ExpectingConfirmationController($scope, $localStorage, $location, $http, $interval) {
	
    console.log("ExpectingConfirmationController initialized");
    
    //---------  Timer-------------------
    var d;
    d = new Date($localStorage.clock);
    
    var tick = function() {
        $scope.clock = d;
        d.setSeconds(d.getSeconds() + 1);
    }
    tick();
    $interval(tick, 1000);
    //-----------------------------------    
	
  
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