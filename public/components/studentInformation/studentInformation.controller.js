(function () {

  'use strict';

  angular
    .module('app')
    .controller('StudentInformationController', StudentInformationController);

  StudentInformationController.$inject = ['$scope', '$http', '$rootScope', '$localStorage', '$interval', 'authService', '$stateParams','$state'];

  function StudentInformationController($scope, $http, $rootScope, $localStorage, $interval, authService, $stateParams, $state) {
		

		$scope.state = $state.current
    	$scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition;

		console.log("StudenInformationController initialized");
		
	    var vm = this;
   		vm.authService = authService;
		   
      //------------Countdown--------------
	  	$scope.lessOneMinute = false;
    	$scope.lessTenSeconds = false;
	  	var countDownDate = $localStorage.countDownDate;
    	var tick = function() {
			var now = new Date().getTime();
        	var distance = countDownDate - now;
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if(minutes.toString().length == 1){
				minutes = '0' + minutes;
			}
			if(seconds.toString().length == 1){
				seconds = '0' + seconds;
			}
			$scope.clock = minutes + "m " + seconds + "s ";
			if (distance < 0) {
				clearInterval(tick);
				$scope.clock = "TIME OUT";
			}
			if (minutes < 1) {
				$scope.lessOneMinute = true;
			}
			if (minutes < 1 && seconds < 10) {
				$scope.lessTenSeconds = true;
			}
        }
		tick();
		$interval(tick, 1000);
      //-----------------------------------

	
		
		//console.log($localStorage.studentLogged); //se coge del js de auth0
		//$localStorage.$reset();
		
		$http.get('api/v1/feedman/subjects/' + $scope.params.subject + '/' + $scope.params.edition + '/feedbacksInformation/')
			.then(function(response) {
				console.log(response.data);
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
				"reviewed": "",
				"preparationEnd": "no",
				"result": "NEGATIVE",
				"waiting": "si",
				"score": 0,
				"confirmed": 0,
				"timeFirstPart": "",
				"timeSecondPart": "",
				"timeThirdPart": "",
				"role": "",
				"corrected": "no",
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
			  
	
			console.log('aqui: ' + $scope.newFeedbackResult);
			$http.post('/api/v1/feedman/subjects/' + $scope.params.subject + '/' + $scope.params.edition + '/feedbacksResults', $scope.newFeedbackResult)
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