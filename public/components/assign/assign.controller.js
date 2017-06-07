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
    
    $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
      .then(function(response) {
          console.log(response.data[0]);
          $scope.rw = response.data[0].reviewer;
      })
      .catch(function(response) {
          console.error('Feedbacks results error', response.status, response.data);
      })
      .finally(function() {
      });
    
    

    $scope.refresh = function(){
      console.log($scope.role);
      if($scope.rw != ""){
        $scope.withAssignment = ['e1', 'e2'];
      }else{
        $scope.withAssignment = ['e1'];
      }
    }

  }

}());