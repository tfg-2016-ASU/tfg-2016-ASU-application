(function () {
  'use strict';

  angular
    .module('app')
    .controller('ImproveCheckV2Controller', ImproveCheckV2Controller);

  ImproveCheckV2Controller.$inject = ['$scope', '$localStorage', '$location', '$http'];

  function ImproveCheckV2Controller($scope, $localStorage, $location, $http) {
	
    console.log("ImproveCheckV2Controller initialized");
    
    $scope.reviewedFeedbackResult = $localStorage.reviewedFeedbackResult;
    $scope.idFeedback = $localStorage.idFeedback;
    console.log($localStorage.currentCheck);
    $scope.idCheckToShow = $localStorage.currentCheck;
    var checks = $localStorage.checks
    var checksLength = checks.length;
    $localStorage.lastCheck = checks[checksLength-1].idCheck;
    /*
    $scope.checkToImprove = $localStorage.checkToImprove;
    console.log($scope.checkToImprove);
    $localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.checkToImprove].result = 'OK';
    console.log($localStorage.reviewedFeedbackResult.arrayCheckResults[$scope.checkToImprove].result);
    console.log($localStorage.reviewedFeedbackResult);*/


    $scope.improve = function (){

      var i;
      for (i = 0; i < $scope.reviewedFeedbackResult.arrayCheckResults.length; i++) {
        if($scope.reviewedFeedbackResult.arrayCheckResults[i].idCheck == $localStorage.currentCheck){
          $scope.reviewedFeedbackResult.arrayCheckResults.splice(i, 1);
        }
      };

      
      console.log($scope.comments);
      if($scope.comments != 'no'){
        $scope.reviewedFeedbackResult.arrayCheckResults.push({"idCheck": $scope.idCheckToShow,
                                                                "result": "ok",
                                                                "comments": $scope.comments
                                                               });
      }else{
        $scope.reviewedFeedbackResult.arrayCheckResults.push({"idCheck": $scope.idCheckToShow,
                                                                "result": "ok",
                                                                "comments": "no"
                                                               });
      }

      

      console.log($scope.reviewedFeedbackResult);

                                                        
      if($scope.idCheckToShow == $localStorage.lastCheck){
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.student, $scope.reviewedFeedbackResult)
        .then(function(response) {
          console.log('put perfect');
          /*$localStorage.currentCheck = $localStorage.currentCheck + 1;
          $scope.idCheckToShow = checks[$localStorage.currentCheck].idCheck;
          $scope.checkToShow = checks[$scope.idCheckToShow];
          $scope.descriptionToShow = checks[$scope.idCheckToShow].description;
          console.log('current check: ' + $localStorage.currentCheck);
          console.log('id check to show: ' + $scope.idCheckToShow);
          $localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
          $localStorage.lengthArrayCheckResults = $localStorage.reviewedFeedbackResult['arrayCheckResults'].length;
          console.log('here: ' + $localStorage.reviewedFeedbackResult['arrayCheckResults'].length); */
          $location.path('/finish');
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          
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
          $localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
          $localStorage.lengthArrayCheckResults = $localStorage.reviewedFeedbackResult['arrayCheckResults'].length;
          console.log('here: ' + $localStorage.reviewedFeedbackResult['arrayCheckResults'].length); 
          
          
          $location.path('/checksSwipe');
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

    $scope.noImprove = function (){

      var i;
      for (i = 0; i < $scope.reviewedFeedbackResult.arrayCheckResults.length; i++) {
        if($scope.reviewedFeedbackResult.arrayCheckResults[i].idCheck == $localStorage.currentCheck){
          $scope.reviewedFeedbackResult.arrayCheckResults.splice(i, 1);
        }
      };

      console.log($scope.comments);
      if($scope.comments != 'no'){
        $scope.reviewedFeedbackResult.arrayCheckResults.push({"idCheck": $scope.idCheckToShow,
                                                                "result": "no",
                                                                "comments": $scope.comments
                                                                });
      }else{
         $scope.reviewedFeedbackResult.arrayCheckResults.push({"idCheck": $scope.idCheckToShow,
                                                                "result": "no",
                                                                "comments": "no"
                                                                });
      }

     

      console.log($scope.reviewedFeedbackResult);

                                                        
      if($scope.idCheckToShow == $localStorage.lastCheck){
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.student, $scope.reviewedFeedbackResult)
        .then(function(response) {
          console.log('put perfect');
          /*$localStorage.currentCheck = $localStorage.currentCheck + 1;
          $scope.idCheckToShow = checks[$localStorage.currentCheck].idCheck;
          $scope.checkToShow = checks[$scope.idCheckToShow];
          $scope.descriptionToShow = checks[$scope.idCheckToShow].description;
          console.log('current check: ' + $localStorage.currentCheck);
          console.log('id check to show: ' + $scope.idCheckToShow);
          $localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
          $localStorage.lengthArrayCheckResults = $localStorage.reviewedFeedbackResult['arrayCheckResults'].length;
          console.log('here: ' + $localStorage.reviewedFeedbackResult['arrayCheckResults'].length); */
          $location.path('/finish');
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          
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
          $localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
          $localStorage.lengthArrayCheckResults = $localStorage.reviewedFeedbackResult['arrayCheckResults'].length;
          console.log('here: ' + $localStorage.reviewedFeedbackResult['arrayCheckResults'].length); 
          
          
          $location.path('/checksSwipe');
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
  }

}());