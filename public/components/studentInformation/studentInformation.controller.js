(function () {

  'use strict';

  angular
    .module('app')
    .controller('StudenInformationController', StudenInformationController);

  StudenInformationController.$inject = ['$scope', '$http', '$rootScope'];

  function StudenInformationController($scope, $http, $rootScope) {

		console.log("StudenInformationController initialized");

		$rootScope.idFeedback = 0;

		$scope.addFeedbackResult = function (){
	
			//Inicializar las propiedad de newFeedbackResult que no han sido inicializadas en el formulario
			$scope.newFeedbackResult.subject = "sos";
			$scope.newFeedbackResult.edition = "15-16";
			$scope.newFeedbackResult.subject = "SOS";
			$scope.newFeedbackResult.reviewer = "";
			$scope.newFeedbackResult.preparationEnd = "no";
			$scope.newFeedbackResult.result = "";
			$scope.newFeedbackResult.score = 0;
			$scope.newFeedbackResult.arrayCheckResults = [];


			console.log("New ADD");
	
			console.log($scope.newFeedbackResult);
			//$scope.newPet.id = parseInt($scope.newPet.id);

			$rootScope.idFeedback = $scope.newFeedbackResult.idFeedback;
			$rootScope.student = $scope.newFeedbackResult.student;
			$rootScope.newFeedbackResult = $scope.newFeedbackResult;


			$http.post('/api/feedbacksResults', $scope.newFeedbackResult)
			.then(function(response) {
					console.log('Feedback result added correctly!');
						
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