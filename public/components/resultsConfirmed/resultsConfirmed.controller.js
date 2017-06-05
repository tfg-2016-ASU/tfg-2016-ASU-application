(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResultsConfirmedController', ResultsConfirmedController);

  ResultsConfirmedController.$inject = ['$scope', '$localStorage', '$http', '$interval'];

  function ResultsConfirmedController($scope, $localStorage, $http, $interval) {
	
    console.log("ResultsConfirmedController initialized");

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
    $scope.student = $localStorage.newFeedbackResult.student;

    console.log($localStorage.newFeedbackResult.arrayCheckResults.length>0);

    //$scope.confirmed = ($localStorage.firstReviewer == $localStorage.newFeedbackResult.student);
    //$scope.confirmed = ($localStorage.newFeedbackResult.arrayCheckResults.length>0);
  
    $scope.confirmed = $localStorage.resultsConfirmed;

    console.log($localStorage.RWDEF.reviewer);
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

  }

}());