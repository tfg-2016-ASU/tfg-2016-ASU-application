(function () {
  'use strict';

  angular
    .module('app')
    .controller('PreparationController', PreparationController);

  PreparationController.$inject = ['$scope', '$http', '$rootScope', '$localStorage', '$interval', '$state', '$stateParams'];

  function PreparationController($scope, $http, $rootScope, $localStorage, $interval, $state, $stateParams) {

    console.log("PreparationController initialized");
   
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
     
      //-----------------------------------


    $scope.preparationReady = 'no';
    

    /*
    console.log(JSON.parse(JSON.stringify($localStorage.newFeedbackResult)));
    $localStorage.idFeedback = JSON.parse(JSON.stringify($localStorage.newFeedbackResult).idFeedback);
    $scope.idFeedback = $localStorage.idFeedback;
    console.log($localStorage.idFeedback);
    */

    $scope.newFeedbackResult = $localStorage.newFeedbackResult;
    console.log($scope.newFeedbackResult.idFeedback);
    $scope.idFeedback = $scope.newFeedbackResult.idFeedback;

    $scope.changePreparationEnd = function(){
      console.log("cambié");
      console.log($scope.preparationReady);
      $scope.newFeedbackResult.preparationEnd = $scope.preparationReady;

    }
    
    $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.newFeedbackResult.idFeedback)
    .then(function(response) {      
      $scope.preparation = response.data[0].preparation;
      $localStorage.checks = response.data[0].checks;
      //$scope.checks = response.data[0].checks;
      console.log($localStorage.checks);
      $localStorage.punctuation = response.data[0].punctuation;
      console.log($localStorage.punctuation);
    })
    .catch(function(response) {
      console.error('Show preparation error', response.status, response.data);
    })
    .finally(function() {
      console.log("Preparation showed");
    });

    
    $scope.modifyPreparationEnd = function(){
      console.log('clock: ' + $scope.clock);
      $scope.newFeedbackResult['timeFirstPart'] = $scope.clock;
      $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.newFeedbackResult.student, $scope.newFeedbackResult)
				.then(function(response) {
					console.log('all perfect');
          $localStorage.newFeedbackResult = $scope.newFeedbackResult;
          console.log($localStorage.newFeedbackResult);
				})
				.catch(function(response) {
					console.error('Error', response.status, response.data);
				})
				.finally(function() {
					console.log("Finished");
				});

       
       var minutesLeft = 5;

        var countDownDate = new Date();
      
        countDownDate.setMinutes(countDownDate.getMinutes()+minutesLeft);
     
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

  }

}());