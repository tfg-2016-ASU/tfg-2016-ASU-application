(function () {
  'use strict';

  angular
    .module('app')
    .controller('FinishController', FinishController);

  FinishController.$inject = ['$scope', '$rootScope', '$localStorage', '$http', '$interval', '$state', '$stateParams'];

  function FinishController($scope, $rootScope, $localStorage, $http, $interval, $state, $stateParams) {
	
    console.log("FinishController initialized");

    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition;  
    
    //------------Countdown--------------
    $scope.lessOneMinute = false;
    $scope.lessTenSeconds = false;
    var countDownDate = $localStorage.countDownDate;
    var tick = function() {
      var now = new Date().getTime();
          var distance = countDownDate - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      $scope.clock = minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(tick);
        $scope.clock = "EXPIRED";
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
    
    $scope.idFeedback = $localStorage.idFeedback;

   

    //inicializo result y score en positivo
    //$localStorage.reviewedFeedbackResult.result = 'POSITIVO';
    //$localStorage.reviewedFeedbackResult.score = $localStorage.punctuation;

    var i;
    var negativeFeedback = false;


    if($localStorage.reviewedFeedbackResult.arrayCheckResults.length != $localStorage.checks.length){
        console.log('if');
        $localStorage.reviewedFeedbackResult.result = 'NEGATIVE';
        $localStorage.reviewedFeedbackResult.score = 0;
    }else{
      console.log('else');
      for(i=0; i<$localStorage.reviewedFeedbackResult.arrayCheckResults.length; i++){
        if($localStorage.reviewedFeedbackResult.arrayCheckResults[i].result == 'no'){
          console.log('aqui');
          $localStorage.reviewedFeedbackResult.result = 'NEGATIVE';
          $localStorage.reviewedFeedbackResult.score = 0;
          negativeFeedback = true;
          break;
        }
      }

      if(negativeFeedback == false){
        $localStorage.reviewedFeedbackResult.result = 'POSITIVE';
        $localStorage.reviewedFeedbackResult.score = $localStorage.punctuation;
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
    $scope.totalChecks = $localStorage.checks.length;
    

  
    $scope.finishFeedback = function(){
       console.log('clock: ' + $scope.clock);
       $localStorage.reviewedFeedbackResult['timeThirdPart'] = $scope.clock;
       console.log('resultado: ' + $localStorage.reviewedFeedbackResult);
       //modifio el confirmed del student
        $localStorage.reviewedFeedbackResult.confirmed = 1;
        $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.reviewedFeedbackResult.student, $localStorage.reviewedFeedbackResult)
          .then(function(response) {
            console.log('perfe');
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            console.log('resultado: ' + response.data);
          });

      
     
        /*
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
      
    
    
  

*/}

    

  }

}());