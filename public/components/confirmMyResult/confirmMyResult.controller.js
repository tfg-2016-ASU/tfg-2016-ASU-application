(function () {
  'use strict';

  angular
    .module('app')
    .controller('ConfirmMyResultController', ConfirmMyResultController);

  ConfirmMyResultController.$inject = ['$scope', '$localStorage', '$http', '$interval', '$state', '$stateParams'];

  function ConfirmMyResultController($scope, $localStorage, $http, $interval, $state, $stateParams) {
	
    console.log("ConfirmMyResultController initialized");
    
    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition; 
   
    
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.student = $localStorage.studentLogged;
    //console.log($localStorage.firstReviewer == $scope.student);
    //$scope.firstReviewer = ($localStorage.firstReviewer == $scope.student);
    //$scope.firstReviewer = false;
    $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentLogged)
      .then(function(response) {
        $scope.role = response.data[0].role;
        console.log($scope.role);
      })
      .catch(function(response) {
        console.error('Error', response.status, response.data);
      })
      .finally(function() {
        console.log("Finished");
      });


    /*$http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.newFeedbackResult.reviewer)
      .then(function(response) {
        console.log('get perfect');
        console.log(response.data[0].confirmed);
        $scope.confirmed = response.data[0].confirmed;
      })
      .catch(function(response) {
        console.error('Error', response.status, response.data);
      })
      .finally(function() {
        console.log("Finished");
      });*/

    /*
    $scope.confirm = 'no';
    $scope.confirmResult = function(){
      console.log("cambié");
      console.log($scope.confirm);
    }
    */

    $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
      .then(function(response) {
        console.log('get perfect');
        $scope.resultsToConfirm = response.data[0];
        console.log( $scope.resultsToConfirm);
        $scope.reviewerC = $scope.resultsToConfirm.reviewer;
        $scope.reviewedC = $scope.resultsToConfirm.student;
        $scope.checksC = $scope.resultsToConfirm.arrayCheckResults;
        var j;
        var cont = 0;
        for(j=0; j<$scope.checksC.length; j++){
          if($scope.checksC[j].result == 'ok'){
            cont++;
          }
        }
        $scope.wellChecks = cont;
        $scope.totalChecks = $localStorage.checks.length;
        $scope.resultC = $scope.resultsToConfirm.result;
        $scope.scoreC = $scope.resultsToConfirm.score;
      })
      .catch(function(response) {
        console.error('Error', response.status, response.data);
      })
      .finally(function() {
        console.log("Finished");
      });

    $scope.finishFeedback = function(res){
      console.log(res);
      //if res=='no' que hago? un delete?
      //modifico la propiedad confirmed para que sea 2
      if(res=='si'){
        $scope.resultsToConfirm.confirmed = 2;
        $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.resultsToConfirm.student, $scope.resultsToConfirm)
          .then(function(response) {
            console.log('put perfect');
            //$localStorage.firstReviewFinished = true;
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            console.log("Finished");
          });
      }
    }
  }

}());