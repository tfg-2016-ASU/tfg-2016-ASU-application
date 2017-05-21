(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChecksSwipeController', ChecksSwipeController);

  ChecksSwipeController.$inject = ['$scope', '$rootScope', '$http', '$location', '$localStorage'];

  function ChecksSwipeController($scope, $rootScope, $http, $location, $localStorage) {
	
    console.log("ChecksSwipeController initialized");

   
    $localStorage.studentReviewed = $localStorage.RWDEF.student;
    $localStorage.reviewedFeedbackResult = $localStorage.RWDEF;

    
    

    

    //$localStorage.reviewedFeedbackResult.arrayCheckResults.push();

    $scope.reviewedFeedbackResult = $localStorage.reviewedFeedbackResult; //no volver a guardar nada en local.reviewedfeedres

		$scope.idFeedback = $scope.reviewedFeedbackResult.idFeedback;
    $localStorage.idFeedback = $scope.idFeedback;
    $localStorage.lengthArrayCheckResults = $localStorage.reviewedFeedbackResult['arrayCheckResults'].length;
    

   
    //Obtener las checks que hay que mostrar
    var checks = $localStorage.checks
    
    if ($localStorage.lengthArrayCheckResults == 0){
      $localStorage.currentCheck = 0;
    }
    console.log('current check: ' + $localStorage.currentCheck);



    var checksLength = checks.length;
    $localStorage.lastCheck = checks[checksLength-1].idCheck;

    if($localStorage.currentCheck > $localStorage.lastCheck){
      $location.path('/finish');
    }else{
      $scope.idCheckToShow = $localStorage.currentCheck;
      $scope.descriptionToShow = checks[$localStorage.currentCheck].description;
     
      console.log('id check to show: ' + $scope.idCheckToShow);
     
    }

    



    

    $scope.nextCheck = function (ev){


      var i;
      for (i = 0; i < $scope.reviewedFeedbackResult.arrayCheckResults.length; i++) {
        if($scope.reviewedFeedbackResult.arrayCheckResults[i].idCheck == $localStorage.currentCheck){
          $scope.reviewedFeedbackResult.arrayCheckResults.splice(i, 1);
          console.log('ana palangana');
        }
      };

      console.log()

      $scope.reviewedFeedbackResult.arrayCheckResults.push({"idCheck": $scope.idCheckToShow,
                                                              "result": "ok",
                                                              "comments": "no"});

      $localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
      console.log($scope.reviewedFeedbackResult);

                                                          
      if($scope.idCheckToShow == $localStorage.lastCheck){
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentReviewed, $scope.reviewedFeedbackResult)
        .then(function(response) {
          console.log('put perfect');
          $localStorage.currentCheck = $localStorage.currentCheck + 1;
          $scope.idCheckToShow = checks[$localStorage.currentCheck].idCheck;
          $scope.checkToShow = checks[$scope.idCheckToShow];
          $scope.descriptionToShow = checks[$scope.idCheckToShow].description;
          console.log('current check: ' + $localStorage.currentCheck);
          console.log('id check to show: ' + $scope.idCheckToShow);
          
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          $scope.finishFeedback();
        });

        

      }else{
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentReviewed, $scope.reviewedFeedbackResult)
        .then(function(response) {
          console.log('put perfect');
          //$localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
          $localStorage.currentCheck = $localStorage.currentCheck + 1;
          $scope.idCheckToShow = checks[$localStorage.currentCheck].idCheck;
          $scope.checkToShow = checks[$scope.idCheckToShow];
          $scope.descriptionToShow = checks[$scope.idCheckToShow].description;
          console.log('current check: ' + $localStorage.currentCheck);
          console.log('id check to show: ' + $scope.idCheckToShow);
          
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          
        });

       
        
      }
      
    }	

    $scope.improveCheck = function (idCheckToShow){
      $localStorage.currentCheck = idCheckToShow;
      console.log("improveCheck");
      $location.path('/improveCheck');
    }
    

    $scope.finishFeedback = function (){
      console.log("finish");
      $location.path('/finish');
    }


    $scope.resumeFeedback = function (){
      console.log("resume");
    }

     $scope.onSwipeLeft = function(ev) {
      $location.path('/finish');
    };

    $scope.onSwipeRight = function(ev) {
      $scope.nextCheck();
    };

    
  }
  

}());