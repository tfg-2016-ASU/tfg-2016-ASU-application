(function () {
  'use strict';

  angular
    .module('app')
    .controller('SelectRoleController', SelectRoleController);

  SelectRoleController.$inject = ['$scope', '$localStorage', '$http', '$interval', '$state', '$stateParams'];

  function SelectRoleController($scope, $localStorage, $http, $interval, $state, $stateParams) {
	
    console.log("SelectRoleController initialized");

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
        console.log($scope.clock);
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
	
    $scope.newFeedbackResult = $localStorage.newFeedbackResult;
    $scope.idFeedback = $scope.newFeedbackResult.idFeedback;
    $scope.student = $scope.newFeedbackResult.student;
    console.log($scope.newFeedbackResult);


    $scope.select = function(res){
      $localStorage.role = res;
      $scope.newFeedbackResult.role = $localStorage.role;
      console.log($scope.newFeedbackResult);
      console.log($scope.student);

      $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student  , $scope.newFeedbackResult)
				.then(function(response) {
					console.log('Feedback result added correctly!');	
          console.log($scope.newFeedbackResult);
          $localStorage.newFeedbackResult = $scope.newFeedbackResult;
				})
				.catch(function(response) {
					console.error('Feedbacks results error', response.status, response.data);
				})
				.finally(function() {
					console.log("Feedbacks results showed");
				});
    }
  }

}());