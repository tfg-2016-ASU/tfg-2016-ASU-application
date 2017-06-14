(function () {
  'use strict';

  angular
    .module('app')
    .controller('BeginReviewController', BeginReviewController);

  BeginReviewController.$inject = ['$scope', '$localStorage', '$http', '$interval', '$state', '$stateParams'];

  function BeginReviewController($scope, $localStorage, $http, $interval, $state, $stateParams) {
	
    console.log("BeginReviewController initialized");

    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition;    

    $scope.id = 1;
	
    $scope.idFeedback = $localStorage.idFeedback;
    console.log($localStorage.rw);

    //------------Countdown--------------
    /*$scope.lessOneMinute = false;
    $scope.lessTenSeconds = false;
    var countDownDate = $localStorage.countDownDate;
    var tick = function() {
      var now = new Date().getTime();
          var distance = countDownDate - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      $scope.clock = minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(tick);
        $scope.clock = "EXPIRED";
      }
      if (minutes < 1) {
        $scope.lessOneMinute = true;
      }
      if (minutes < 1 && seconds < 10) {
        $scope.lessTenSeconds = true;
      }
    }
		tick();
		$interval(tick, 1000);*/
    //-----------------------------------

    $scope.beginReview = function(){
      
    }
    
    $scope.startTimer = function(){
       var minutesLeft = 5;

        var countDownDate = new Date();
        console.log(countDownDate);
        countDownDate.setMinutes(countDownDate.getMinutes()+minutesLeft);
        console.log(countDownDate);
        countDownDate = countDownDate.getTime();
        $localStorage.countDownDate = countDownDate;

        $scope.lessOneMinute = false;
        $scope.lessTenSeconds = false; 
        var tick = function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            $scope.clock = minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(tick);
                $scope.clock = "EXPIRED";
            }
            if (minutes < 1) {
                $scope.lessOneMinute = true;
            }
            if (minutes < 1 && seconds < 10) {
                $scope.lessTenSeconds = true;
            }
        }
        tick();
        $interval(tick, 1000);
    }
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