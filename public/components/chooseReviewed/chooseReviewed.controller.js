(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChooseReviewedController', ChooseReviewedController);

  ChooseReviewedController.$inject = ['$scope', '$rootScope', '$http', '$localStorage', '$location'];

  function ChooseReviewedController($scope, $rootScope, $http, $localStorage, $location) {
	
    console.log("ChooseReviewedController initialized");

		//Obtengo todos los resultados cuyo idFeedback sea el que necesitamos
    //$http.get('/api/feedbacksResults/' + $rootScope.idFeedback)


		$scope.newFeedbackResult = $localStorage.newFeedbackResult;
		console.log($scope.newFeedbackResult);
		$scope.idFeedback = $scope.newFeedbackResult.idFeedback;


		$http.get('/api/findStudentsPrepared/' + $scope.idFeedback)
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

			//get al student que voy a revisar -> obetngo sus datos -> le modifico el reviewer 
			$http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.studentReviewed)
			.then(function(response) {     
				$scope.reviewedFeedbackResult = response.data[0];
				console.log($scope.reviewedFeedbackResult);
				
				/*
				//Modifico el reviewer
		    //Elimino el _id y el createDate ya que al hacer el put swagger espera un objeto json sin esos atributos
				delete $scope.reviewedFeedbackResult._id;
			  delete $scope.reviewedFeedbackResult.createDate;
			  $scope.reviewedFeedbackResult.reviewer = $scope.studentReviewer;
				$localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
				
				//$localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
				//Crear un objeto con todas las propiedades undefined excepto el reviewer
				$scope.newFeedbackResult.reviewer = $scope.newFeedbackResult.student;
				*/
				 $scope.reviewedFeedbackResult.reviewer = $scope.newFeedbackResult.student;
				
				$http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.studentReviewed, $scope.reviewedFeedbackResult)
				.then(function(response) {
					console.log('all perfect');

					$localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
				  console.log($localStorage.reviewedFeedbackResult);

					$localStorage.reviewedFeedbackResult.arrayCheckResults = [];
					$localStorage.currentCheck = 0;
					$location.path('/checks');
					
				})
				.catch(function(response) {
					console.error('Error', response.status, response.data);
				})
				.finally(function() {
					console.log("Finished");
				});

				

			})
			.catch(function(response) {
				console.error('Show preparation error', response.status, response.data);
			})
			.finally(function() {
				console.log("Preparation showed");
			});
		
	}

  }

}());