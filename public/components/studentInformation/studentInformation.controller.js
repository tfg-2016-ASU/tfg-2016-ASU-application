(function () {

  'use strict';

  angular
    .module('app')
    .controller('StudenInformationController', StudenInformationController);

  StudenInformationController.$inject = ['$scope', '$http', '$rootScope', '$localStorage'];

  function StudenInformationController($scope, $http, $rootScope, $localStorage) {

		console.log("StudenInformationController initialized");
		$localStorage.$reset();


		//------------------------------------------------------------------------------------------------
		//Inicializar las propiedad de newFeedbackResult que no han sido inicializadas en el formulario
			
			$scope.newFeedbackResult = {
				"subject": "SOS",
				"edition": "15-16",
				"reviewer": "",
				"preparationEnd": "no",
				"result": "NEGATIVO",
				"waiting": "si",
				"score": 0,
				"arrayCheckResults": [
				]
			};


		
	
			//console.log($scope.newFeedbackResult);
			$localStorage.newFeedbackResult = $scope.newFeedbackResult;
			//console.log($localStorage.newFeedbackResult);
			

			//$scope.newPet.id = parseInt($scope.newPet.id);

			/*
			$rootScope.idFeedback = $scope.newFeedbackResult.idFeedback;
			$rootScope.student = $scope.newFeedbackResult.student;
			$rootScope.newFeedbackResult = $scope.newFeedbackResult;
			*/
			
			//Así obtengo el objeto JSON a partir de un string que previamente era un objeto javascript
			//console.log(JSON.parse(JSON.stringify($localStorage.newFeedbackResult)));
			//------------------------------------------------------------------------------------------------



		//$rootScope.idFeedback = 0;

		$scope.addFeedbackResult = function (){
			
			/*
			//Inicializar las propiedad de newFeedbackResult que no han sido inicializadas en el formulario
			$scope.newFeedbackResult.subject = "sos";
			$scope.newFeedbackResult.edition = "15-16";
			$scope.newFeedbackResult.subject = "SOS";
			$scope.newFeedbackResult.reviewer = "";
			$scope.newFeedbackResult.preparationEnd = "no";
			$scope.newFeedbackResult.result = "";
			$scope.newFeedbackResult.score = 0;
			$scope.newFeedbackResult.arrayCheckResults = [];
			*/

			//console.log("New ADD");
	
			//console.log($scope.newFeedbackResult);
			//$scope.newPet.id = parseInt($scope.newPet.id);

			/*
			$rootScope.idFeedback = $scope.newFeedbackResult.idFeedback;
			$rootScope.student = $scope.newFeedbackResult.student;
			$rootScope.newFeedbackResult = $scope.newFeedbackResult;
			*/

			//$localStorage.newFeedbackResult = $scope.newFeedbackResult;
			//console.log('¿Funciona? ' + JSON.stringify($localStorage.newFeedbackResult));
			
			//Así obtengo el objeto JSON a partir de un string que previamente era un objeto javascript
			//console.log(JSON.parse(JSON.stringify($localStorage.newFeedbackResult)));

		

			$http.post('/api/feedbacksResults', $scope.newFeedbackResult)
			.then(function(response) {
					console.log('Feedback result added correctly!');
						
				})
			.catch(function(response) {
			  console.error('Feedbacks results error', response.status, response.data);
			})
			.finally(function() {
			  console.log("Feedbacks results showed");
				//console.log($localStorage.newFeedbackResult);
			});

		}
    
  }

}());