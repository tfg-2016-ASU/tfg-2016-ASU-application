(function () {
  'use strict';

  angular
    .module('app')
    .controller('WaitingConfirmationController', WaitingConfirmationController);

  WaitingConfirmationController.$inject = ['$scope', '$http', '$localStorage', '$location', '$interval'];

  function WaitingConfirmationController($scope, $http, $localStorage, $location, $interval) {
	
    console.log("WaitingConfirmationController initialized");

   

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