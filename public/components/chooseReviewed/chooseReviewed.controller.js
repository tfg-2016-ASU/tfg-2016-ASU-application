(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChooseReviewedController', ChooseReviewedController);

  ChooseReviewedController.$inject = ['$scope', '$rootScope', '$http'];

  function ChooseReviewedController($scope, $rootScope, $http) {
	
    console.log("ChooseReviewedController initialized");

		//Obtengo todos los resultados cuyo idFeedback sea el que necesitamos
    //$http.get('/api/feedbacksResults/' + $rootScope.idFeedback)
		$http.get('/api/feedbacksResults/1')
		.then(function(response) {
			$rootScope.feedbacksResults = response.data;
			console.log($rootScope.feedbacksResults);
		})
		.catch(function(response) {
			console.error('Feedbacks results error', response.status, response.data);
		})
		.finally(function() {
			console.log("Successful request to feedbacks results");
		});


    $scope.chooseReviewer = function (student){	

			$rootScope.studentReviewed = student;
			console.log('Revisado: ' + $rootScope.studentReviewed);	//este es el alumno que será revisado
			console.log('Revisor: ' + $rootScope.student);	//este es el alumno loggeado en el sistema, que actuará como revisor
			
			//Crear un objeto con todas las propiedades undefined excepto el reviewer
			$rootScope.newFeedbackResult.reviewer = $rootScope.student;
			



			console.log($rootScope.student);
			$http.put('/api/feedbacksResults/' + $rootScope.idFeedback + '/' + $rootScope.studentReviewed, $rootScope.newFeedbackResult)
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