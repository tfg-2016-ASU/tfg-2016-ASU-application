(function () {
  'use strict';

  angular
    .module('app')
    .controller('ImproveCheckController', ImproveCheckController);

  ImproveCheckController.$inject = ['$scope', '$localStorage', '$location', '$http', '$interval', '$state', '$stateParams'];

  function ImproveCheckController($scope, $localStorage, $location, $http, $interval, $state, $stateParams) {
	
    console.log("ImproveCheckController initialized");

    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition; 
  
   
      //------------Countdown--------------
        $scope.lessOneMinute = false;
        $scope.lessTenSeconds = false;
        var countDownDate = $localStorage.countDownDate;
        var tick = function() {
        var now = new Date().getTime();
            var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(minutes.toString().length == 1){
          minutes = '0' + minutes;
        }
        if(seconds.toString().length == 1){
          seconds = '0' + seconds;
        }
        $scope.clock = minutes + "m " + seconds + "s ";
        
        if (distance < 0) {
          clearInterval(tick);
          $scope.clock = "TIME OUT";
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
     
      //-----------------------------------


    $scope.reviewedFeedbackResult = $localStorage.reviewedFeedbackResult;
    $scope.idFeedback = $localStorage.idFeedback;

    $scope.idCheckToShow = $localStorage.currentCheck;

    console.log($localStorage.reviewedFeedbackResult);


    $scope.checkImproved = 'no';
    $scope.changeCheckImproved = function(){
      console.log("cambié");
      console.log($scope.checkImproved);
    }

    
    $scope.improve = function(){
      console.log($scope.comments);
      if($scope.checkImproved=='no'){
        $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.idCheckToShow-1].result = 'no';
        $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.idCheckToShow-1].corrected = 'no';
        $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.idCheckToShow-1].comments = $scope.comments;
        $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student, $localStorage.reviewedFeedbackResult)
          .then(function(response) {
            console.log('put perfect');
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            console.log('Finished');
          });
      }else if($scope.checkImproved=='si'){
        $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.idCheckToShow-1].result = 'ok';
        $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.idCheckToShow-1].corrected = 'si';
        $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.idCheckToShow-1].comments = $scope.comments;
        $localStorage.reviewedFeedbackResult.corrected = 'si';
        $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student, $localStorage.reviewedFeedbackResult)
          .then(function(response) {
            console.log('put perfect');
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            console.log('Finished');
          });
      }
    }
      
  }

}());