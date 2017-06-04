(function () {
  'use strict';

  angular
    .module('app')
    .controller('BeginReviewController', BeginReviewController);

  BeginReviewController.$inject = ['$scope', '$localStorage', '$http', '$interval'];

  function BeginReviewController($scope, $localStorage, $http, $interval) {
	
    console.log("BeginReviewController initialized");

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
    console.log($localStorage.RWDEF.student);

    $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.RWDEF.student)
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
      
    });

  }

}());