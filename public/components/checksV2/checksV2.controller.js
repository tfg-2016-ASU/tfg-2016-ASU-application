(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChecksV2Controller', ChecksV2Controller);

  ChecksV2Controller.$inject = ['$scope', '$rootScope', '$http', '$location', '$localStorage'];

  function ChecksV2Controller($scope, $rootScope, $http, $location, $localStorage) {
	
    console.log("ChecksV2Controller initialized");
    
    console.log(localStorage.student);
   
    $scope.reviewedFeedbackResult = $localStorage.reviewedFeedbackResult;

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
    

    $scope.nextCheck = function (){

      var i;
      for (i = 0; i < $scope.reviewedFeedbackResult.arrayCheckResults.length; i++) {
        if($scope.reviewedFeedbackResult.arrayCheckResults[i].idCheck == $localStorage.currentCheck){
          $scope.reviewedFeedbackResult.arrayCheckResults.splice(i, 1);
        }
      };


      $scope.reviewedFeedbackResult.arrayCheckResults.push({"idCheck": $scope.idCheckToShow,
                                                              "result": "ok",
                                                              "comments": "no"
                                                          });

      $localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
      console.log($scope.reviewedFeedbackResult);

                                                          
      if($scope.idCheckToShow == $localStorage.lastCheck){
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.student, $scope.reviewedFeedbackResult)
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
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.student, $scope.reviewedFeedbackResult)
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

        //Aquí actualizo las variables relativas a la próxima check que se mostrará en la app
        /*currentCheck = currentCheck + 1;
        $scope.idCheckToShow = checks[currentCheck].idCheck;
        $scope.checkToShow = checks[currentCheck];
        $scope.descriptionToShow = checks[currentCheck].description;
        $scope.typeCheckToShow = checks[currentCheck].typeCheck;*/
        
      }
      
    }	

    $scope.improveCheck = function (idCheckToShow){
      $localStorage.currentCheck = idCheckToShow;
      console.log("improveCheckV2");
    }
    

    $scope.finishFeedback = function (){
      console.log("finish");
      $location.path('/finish');
    }


    $scope.resumeFeedback = function (){
      console.log("resume");
    }

  }
  

}());