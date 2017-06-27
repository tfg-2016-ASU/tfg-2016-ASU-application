(function () {
  'use strict';

  angular
    .module('app')
    .controller('AssignController', AssignController);

  AssignController.$inject = ['$scope', '$localStorage', '$http', '$state', '$stateParams', '$interval'];

  function AssignController($scope, $localStorage, $http, $state, $stateParams, $interval) {
	
    console.log("AssignController initialized");

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

    
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.role = $localStorage.role;
    
    $scope.student = $localStorage.studentLogged;
    
    $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentLogged)
      .then(function(response) {
          console.log(response.data[0]);
          $scope.resp = response.data[0];
          $scope.rw = response.data[0].reviewer;
          $localStorage.rw = response.data[0].reviewer;
          console.log($localStorage.rw);
          if($scope.rw != ""){
            $scope.withAssignment = ['rd', 'rr'];
          }else{
            $scope.withAssignment = ['rd'];
          }
      })
      .catch(function(response) {
          console.error('Feedbacks results error', response.status, response.data);
      })
      .finally(function() {
      });
      
      
    

    $scope.refresh = function(){
    $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
      .then(function(response) {
          console.log(response.data[0]);
          $scope.resp = response.data[0];
          $scope.rw = response.data[0].reviewer;
          $localStorage.rw = $scope.rw;
          if($scope.rw != ""){
            $scope.withAssignment = ['rd', 'rr'];
          }else{
            $scope.withAssignment = ['rd'];
          }
      })
      .catch(function(response) {
          console.error('Feedbacks results error', response.status, response.data);
      })
      .finally(function() {
      });
    }

    $scope.setTimer = function(){
      console.log('clock: ' + $scope.clock);
      $scope.resp['timeSecondPart'] = $scope.clock;
      $scope.resp['timeThirdPart'] = '';
      delete $scope.resp.createDate;
      delete $scope.resp._id;
      $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student, $scope.resp)
				.then(function(response) {
					console.log('all perfect');
				})
				.catch(function(response) {
					console.error('Error', response.status, response.data);
				})
				.finally(function() {
					console.log("Finished");
				});
        //ui-sref="waiting({ subject: subject, edition: edition})"
        //$state.go('waiting', {subject: subject, edition: edition})
    }


  }

}());