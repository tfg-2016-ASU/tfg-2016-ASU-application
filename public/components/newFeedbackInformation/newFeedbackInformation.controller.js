(function () {
  'use strict';

  angular
    .module('app')
    .controller('NewFeedbackInformationController', NewFeedbackInformationController);

  NewFeedbackInformationController.$inject = ['$scope', '$http'];

  function NewFeedbackInformationController($scope, $http) {
	
    console.log("NewFeedbackInformationController initialized");
	
 
		//------------------------------------------------------------------------------------------------
		//Inicializar las propiedad de newFeedbackResult que no han sido inicializadas en el formulario
			
			$scope.newFeedbackInformation = {
				"subject": "SOS",
				"edition": "15-16"
			};

			

      $scope.addFeedbackInformation = function (){
        console.log($scope.newFeedbackInformation);
        
/*
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
*/
      }

  }

}());