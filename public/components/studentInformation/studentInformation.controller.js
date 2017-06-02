(function () {

  'use strict';

  angular
    .module('app')
    .controller('StudenInformationController', StudenInformationController);

  StudenInformationController.$inject = ['$scope', '$http', '$rootScope', '$localStorage'];

  function StudenInformationController($scope, $http, $rootScope, $localStorage) {

		console.log("StudenInformationController initialized");
		console.log($localStorage.studentLogged);
		//$localStorage.$reset();


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
				"confirmed": 0,
				"arrayCheckResults": [
				]
			};


		
	
			$localStorage.newFeedbackResult = $scope.newFeedbackResult;
			$localStorage.newFeedbackResult.student = $localStorage.studentLogged;
			$localStorage.resultsConfirmed = true;
			//Así obtengo el objeto JSON a partir de un string que previamente era un objeto javascript
			//console.log(JSON.parse(JSON.stringify($localStorage.newFeedbackResult)));
			//------------------------------------------------------------------------------------------------



		

		$scope.addFeedbackResult = function (){
			
			
			  
			if($scope.studentForm.$invalid){
				return false;
			}else{
				
				
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
    
  }

}());