(function () {
  'use strict';

  angular
    .module('app')
    .controller('AssignController', AssignController);

  AssignController.$inject = ['$scope', '$localStorage', '$http'];

  function AssignController($scope, $localStorage, $http) {
	
    console.log("AssignController initialized");

    
    
    $scope.idFeedback = $localStorage.idFeedback;
    $scope.role = $localStorage.role;
    
    $scope.student = $localStorage.studentLogged;
    
    $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentLogged)
      .then(function(response) {
          console.log(response.data[0]);
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
    $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
      .then(function(response) {
          console.log(response.data[0]);
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

  }

}());