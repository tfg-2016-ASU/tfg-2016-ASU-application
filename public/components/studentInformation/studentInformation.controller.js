(function () {

  'use strict';

  angular
    .module('app')
    .controller('StudenInformationController', StudenInformationController);

  StudenInformationController.$inject = ['$scope', '$http', '$rootScope', '$localStorage', '$interval'];

  function StudenInformationController($scope, $http, $rootScope, $localStorage, $interval) {


		console.log("StudenInformationController initialized");
	
		//---------  Timer-------------------
		var d;
		d = new Date($localStorage.clock);
		
		var tick = function() {
			$scope.clock = d;
			d.setSeconds(d.getSeconds() + 1);
			$localStorage.clock = d;
		}
		tick();
		$interval(tick, 1000);
		//-----------------------------------

		/*
		var tick = function() {
			$scope.clock = $localStorage.clock;
			console.log($localStorage.clock);
		}
		tick();
		$interval(tick, 1000);
	  	*/
		

		
		//console.log($localStorage.studentLogged); //se coge del js de auth0
		//$localStorage.$reset();

		$http.get('/api/feedbacksInformation')
			.then(function(response) {
				$scope.feedbacksInf = response.data;
				//console.log('Feedback result added correctly!');	
			})
			.catch(function(response) {
				//console.error('Feedbacks results error', response.status, response.data);
			})
			.finally(function() {
				//console.log("Feedbacks results showed");
			});
	
		//------------------------------------------------------------------------------------------------
		//Inicializar las propiedad de newFeedbackResult que no han sido inicializadas en el formulario
			
			$scope.newFeedbackResult = {
				"subject": "SOS",
				"edition": "16-17",
				"reviewer": "",
				"preparationEnd": "no",
				"result": "NEGATIVO",
				"waiting": "si",
				"score": 0,
				"confirmed": 0,
				"role": "",
				"arrayCheckResults": [
				]
			};


			
		
	
			//$localStorage.newFeedbackResult = $scope.newFeedbackResult;
			
			$scope.newFeedbackResult.student = $localStorage.studentLogged;
			console.log($scope.newFeedbackResult);
			$localStorage.resultsConfirmed = true;
			//Así obtengo el objeto JSON a partir de un string que previamente era un objeto javascript
			//console.log(JSON.parse(JSON.stringify($localStorage.newFeedbackResult)));
			//------------------------------------------------------------------------------------------------



		

		$scope.addFeedbackResult = function (){
			$localStorage.newFeedbackResult = $scope.newFeedbackResult;
			$localStorage.idFeedback = $scope.newFeedbackResult.idFeedback;
			  
			if($scope.studentForm.$invalid){
				return false;
			}else{
				
				console.log('aqui: ' + $scope.newFeedbackResult);
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