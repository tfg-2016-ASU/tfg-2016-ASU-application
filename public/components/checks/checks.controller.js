(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChecksController', ChecksController);

  ChecksController.$inject = ['$scope', '$rootScope', '$http', '$location'];

  function ChecksController($scope, $rootScope, $http, $location) {
	
    console.log("ChecksController initialized");
    $rootScope.idFeedback = $rootScope.newFeedbackResult.idFeedback;

    console.log($rootScope.checks.length); 
    //Obtener las checks que hay que mostrar
    console.log($rootScope.checks);
    var checks = $rootScope.checks;
    console.log(checks[0]);


    $rootScope.idCheckToShow = checks[0].idCheck;
    $rootScope.checkToShow = checks[0];
    $rootScope.descriptionToShow = checks[0].description;
    $rootScope.typeCheckToShow = checks[0].typeCheck;
    var currentCheck = $rootScope.idCheckToShow;
    var checksLength = checks.length;
    var lastCheck = $rootScope.checks[checksLength-1].idCheck;
    console.log("numero de tareas pendientes (inclusive la actual): " + checksLength);
    console.log('Currentcheck: ' + currentCheck)
    
    $scope.nextCheck = function (){

      $rootScope.newFeedbackResult.arrayCheckResults.push({"idCheck": $rootScope.idCheckToShow,
                                                              "result": "ok",
                                                              "comments": "no"});


      if(currentCheck == lastCheck){
       
        $http.put('/api/feedbacksResults/' + $rootScope.idFeedback + '/' + $rootScope.studentReviewed, $rootScope.newFeedbackResult)
        .then(function(response) {
          console.log('put perfect');
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          $scope.finishFeedback();
        });

        

      }else{

        $http.put('/api/feedbacksResults/' + $rootScope.idFeedback + '/' + $rootScope.studentReviewed, $rootScope.newFeedbackResult)
        .then(function(response) {
          console.log('put perfect');
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          
        });

        //Aquí actualizo las variables relativas a la próxima check que se mostrará en la app
        currentCheck = currentCheck + 1;
        $rootScope.idCheckToShow = checks[currentCheck].idCheck;
        $rootScope.checkToShow = checks[currentCheck];
        $rootScope.descriptionToShow = checks[currentCheck].description;
        $rootScope.typeCheckToShow = checks[currentCheck].typeCheck;

      }
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