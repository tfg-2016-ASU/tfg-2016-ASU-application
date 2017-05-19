(function () {
  'use strict';

  angular
    .module('app')
    .controller('CrosscheckSelectStudentController', CrosscheckSelectStudentController);

  CrosscheckSelectStudentController.$inject = ['$scope', '$localStorage', '$http'];

  function CrosscheckSelectStudentController($scope, $localStorage, $http) {
	
    console.log("CrosscheckSelectStudentController initialized");
	
    $http.get('/api/feedbacksResults/' + $localStorage.idFeedback)
		.then(function(response) {
			$scope.feedbacksResults = response.data;
			console.log($scope.feedbacksResults);
		})
		.catch(function(response) {
			console.error('Feedbacks results error', response.status, response.data);
		})
		.finally(function() {
			console.log("Successful request to feedbacks results");
		});


    $scope.chooseStudent = function (student){	
      $localStorage.crosscheckStudent = student;
      console.log($localStorage.crosscheckStudent);
    }

  }

}());