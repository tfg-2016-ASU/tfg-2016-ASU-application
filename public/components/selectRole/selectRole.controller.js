(function () {
  'use strict';

  angular
    .module('app')
    .controller('SelectRoleController', SelectRoleController);

  SelectRoleController.$inject = ['$scope', '$localStorage', '$http'];

  function SelectRoleController($scope, $localStorage, $http) {
	
    console.log("SelectRoleController initialized");

    
	
    $scope.newFeedbackResult = $localStorage.newFeedbackResult;
    $scope.idFeedback = $scope.newFeedbackResult.idFeedback;
    $scope.student = $scope.newFeedbackResult.student;
    console.log($scope.newFeedbackResult);


    $scope.select = function(res){
      $localStorage.role = res;
      $scope.newFeedbackResult.role = $localStorage.role;
      console.log($scope.newFeedbackResult);
      console.log($scope.student);

      $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student  , $scope.newFeedbackResult)
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