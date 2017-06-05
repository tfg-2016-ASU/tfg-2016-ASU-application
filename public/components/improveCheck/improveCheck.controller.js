(function () {
  'use strict';

  angular
    .module('app')
    .controller('ImproveCheckController', ImproveCheckController);

  ImproveCheckController.$inject = ['$scope', '$localStorage', '$location', '$http', '$interval'];

  function ImproveCheckController($scope, $localStorage, $location, $http, $interval) {
	
    console.log("ImproveCheckController initialized");
    
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
        $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.idCheckToShow-1].comments = $scope.comments;
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student, $localStorage.reviewedFeedbackResult)
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
        $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.idCheckToShow-1].comments = $scope.comments;
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student, $localStorage.reviewedFeedbackResult)
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