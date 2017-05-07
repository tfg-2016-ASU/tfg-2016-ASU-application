(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChooseReviewedController', ChooseReviewedController);

  ChooseReviewedController.$inject = ['$scope', '$rootScope', '$http', '$localStorage'];

  function ChooseReviewedController($scope, $rootScope, $http, $localStorage) {
	
    console.log("ChooseReviewedController initialized");

		//Obtengo todos los resultados cuyo idFeedback sea el que necesitamos
    //$http.get('/api/feedbacksResults/' + $rootScope.idFeedback)


		$scope.newFeedbackResult = $localStorage.newFeedbackResult;
		console.log($scope.newFeedbackResult);
		$scope.idFeedback = $scope.newFeedbackResult.idFeedback;


		$http.get('/api/feedbacksResults/' + $scope.idFeedback)
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


    $scope.chooseReviewer = function (student){	

			$scope.studentReviewed = student;
			console.log('Revisado: ' + $scope.studentReviewed);	//este es el alumno que será revisado
			console.log('Revisor: ' + $scope.newFeedbackResult.student);	//este es el alumno loggeado en el sistema, que actuará como revisor
			$localStorage.studentReviewed = $scope.studentReviewed;


			//Crear un objeto con todas las propiedades undefined excepto el reviewer
			$scope.newFeedbackResult.reviewer = $scope.newFeedbackResult.student;
			
			$http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.studentReviewed, $scope.newFeedbackResult)
			//$http.put('/api/feedbacksResults/1/david salas', $rootScope.newFeedbackResult)
			.then(function(response) {
				console.log('all perfect');
			})
			.catch(function(response) {
			  console.error('Error', response.status, response.data);
			})
			.finally(function() {
			  console.log("Finished");
			});

			
		
	}

  }

}());