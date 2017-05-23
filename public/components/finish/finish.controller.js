(function () {
  'use strict';

  angular
    .module('app')
    .controller('FinishController', FinishController);

  FinishController.$inject = ['$scope', '$rootScope', '$localStorage', '$http'];

  function FinishController($scope, $rootScope, $localStorage, $http) {
	
    console.log("FinishController initialized");

    
    $scope.idFeedback = $localStorage.idFeedback;

    console.log($localStorage.reviewedFeedbackResult);

    //inicializo result y score en positivo
    $localStorage.reviewedFeedbackResult.result = 'POSITIVO';
    $localStorage.reviewedFeedbackResult.score = $localStorage.punctuation;

    var i;
    for(i=0; i<$localStorage.reviewedFeedbackResult.arrayCheckResults.length; i++){
      if($localStorage.reviewedFeedbackResult.arrayCheckResults[i].result == 'no'){
        $localStorage.reviewedFeedbackResult.result = 'NEGATIVO';
        $localStorage.reviewedFeedbackResult.score = 0;
        break;
      }
    }


    console.log($localStorage.reviewedFeedbackResult);

    $scope.finalResult = $localStorage.reviewedFeedbackResult.result;
    $scope.finalScore = $localStorage.reviewedFeedbackResult.score;
    $scope.finalReviewer = $localStorage.reviewedFeedbackResult.reviewer;
    $scope.finalStudent = $localStorage.reviewedFeedbackResult.student;

    
    var j;
    var cont = 0;
    for(j=0; j<$localStorage.reviewedFeedbackResult.arrayCheckResults.length; j++){
      if($localStorage.reviewedFeedbackResult.arrayCheckResults[j].result == 'ok'){
        cont++;
      }
    }
    $scope.wellChecks = cont;
    $scope.totalChecks = $localStorage.reviewedFeedbackResult.arrayCheckResults.length;
    

    /*

    $http.get('/api/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.studentReviewed)
    .then(function(response) {    
      $scope.feedbackFinished = response.data[0];
      $scope.arrayCheckResults = response.data[0].arrayCheckResults;
      $localStorage.reviewer = response.data[0].reviewer;
      $localStorage.result = 'POSITIVO';
      $localStorage.score = $localStorage.punctuation;

      

      var arrayCheckResultsLength = $scope.arrayCheckResults.length;
      var i;
      for(i=0; i<arrayCheckResultsLength; i++){
       
        if($scope.arrayCheckResults[i].result == 'no'){
          $localStorage.result = 'NEGATIVO';
          $localStorage.score = 0;
         
          break;
        }
      }

      $scope.feedbackFinished.result = $localStorage.result;
      $scope.feedbackFinished.score = $localStorage.score;
     


      console.log($scope.idFeedback);
      console.log($localStorage.studentReviewed);
      console.log($scope.feedbackFinished);
      $scope.feedbackFinished.shift = 'jeje';


    })
    .catch(function(response) {
      console.error('Show arrayCheckResults error', response.status, response.data);
    })
    .finally(function() {
      console.log("arrayCheckResults showed");
    });
    
*/
    $scope.finishFeedback = function(){

      
      
      console.log($localStorage.reviewedFeedbackResult.waiting);
      
      if($localStorage.reviewedFeedbackResult.waiting == 'si'){
        
        //modific el confirmed del student
        $localStorage.reviewedFeedbackResult.confirmed = 1;
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student, $localStorage.reviewedFeedbackResult)
          .then(function(response) {
            console.log('put perfect');
            $localStorage.firstReviewFinished = true;
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            console.log("Finished");
          });


        // obtengo los datos de mi reviewed y le modifico el waiting

        $http.get('/api/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.reviewedFeedbackResult.reviewer)
				.then(function(response) {
					console.log(response.data[0].waiting);
          response.data[0].waiting = 'si';

          console.log($localStorage.reviewedFeedbackResult.reviewer);
          console.log(response.data[0]);
          
          $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.reviewer, response.data[0])
          .then(function(response) {
            console.log('put perfect');
            $localStorage.firstReviewFinished = true;
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            console.log("Finished");
          });

          //$localStorage.firstReviewFinished = true;
				
        })
				.catch(function(response) {
					console.error('Error', response.status, response.data);
				})
				.finally(function() {
					console.log("Finished");
				});
       
      }
      
    }

    

  }

}());