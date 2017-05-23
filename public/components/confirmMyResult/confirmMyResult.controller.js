(function () {
  'use strict';

  angular
    .module('app')
    .controller('ConfirmMyResultController', ConfirmMyResultController);

  ConfirmMyResultController.$inject = ['$scope', '$localStorage', '$http'];

  function ConfirmMyResultController($scope, $localStorage, $http) {
	
    console.log("ConfirmMyResultController initialized");
	
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.student = $localStorage.newFeedbackResult.student;

    $scope.confirm = 'no';
    $scope.confirmResult = function(){
      console.log("cambié");
      console.log($scope.confirm);
    }

    $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
      .then(function(response) {
        console.log('put perfect');
        $scope.resultsToConfirm = response.data[0];
        console.log($scope.resultsToConfirm);
        $scope.reviewerC = $scope.resultsToConfirm.reviewer;
        $scope.checksC = $scope.resultsToConfirm.arrayCheckResults;
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
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.resultsToConfirm.student, $scope.resultsToConfirm)
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