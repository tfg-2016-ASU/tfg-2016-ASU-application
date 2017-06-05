(function () {
  'use strict';

  angular
    .module('app')
    .controller('FinishController', FinishController);

  FinishController.$inject = ['$scope', '$rootScope', '$localStorage', '$http', '$interval'];

  function FinishController($scope, $rootScope, $localStorage, $http, $interval) {
	
    console.log("FinishController initialized");
    
    //---------  Timer-------------------
    var d;
    d = new Date($localStorage.clock);
    
    var tick = function() {
        $scope.clock = d;
        d.setSeconds(d.getSeconds() + 1);
    }
    tick();
    $interval(tick, 1000);
    //-----------------------------------
    
    $scope.idFeedback = $localStorage.idFeedback;

   

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
    

  
    $scope.finishFeedback = function(){

       //modifio el confirmed del student
        $localStorage.reviewedFeedbackResult.confirmed = 1;
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student, $localStorage.reviewedFeedbackResult)
          .then(function(response) {
           
            $localStorage.firstReviewFinished = true;
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
     
          });

      
     
      
      //if($localStorage.reviewedFeedbackResult.waiting == 'no'){
        
       

        // obtengo los datos de mi reviewed y le modifico el waiting
        console.log($localStorage.reviewedFeedbackResult.student);
        $http.get('/api/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student)
				.then(function(response) {
					console.log(response.data[0].waiting);
          response.data[0].waiting = 'no';

          
          $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student, response.data[0])
          .then(function(response) {
           
            //$localStorage.firstReviewFinished = true;
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            
          });

          //$localStorage.firstReviewFinished = true;
				
        })
				.catch(function(response) {
					console.error('Error', response.status, response.data);
				})
				.finally(function() {
					
				});
       
      //}
      
    }

    

  }

}());