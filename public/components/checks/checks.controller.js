(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChecksController', ChecksController);

  ChecksController.$inject = ['$scope', '$rootScope', '$http', '$location', '$localStorage'];

  function ChecksController($scope, $rootScope, $http, $location, $localStorage) {
	
    console.log("ChecksController initialized");
    
    console.log($localStorage.reviewedFeedbackResult);      

    $scope.reviewedFeedbackResult = $localStorage.reviewedFeedbackResult;
		console.log($scope.reviewedFeedbackResult);
		$scope.idFeedback = $scope.reviewedFeedbackResult.idFeedback;
    console.log($scope.idFeedback);
    $localStorage.idFeedback = $scope.idFeedback;

    console.log($localStorage.checks); 
    //Obtener las checks que hay que mostrar
    var checks = $localStorage.checks
    console.log(checks[0]);

    $scope.idCheckToShow = checks[0].idCheck;
    $scope.checkToShow = checks[0];
    $scope.descriptionToShow = checks[0].description;
    $scope.typeCheckToShow = checks[0].typeCheck;
    var currentCheck = $scope.idCheckToShow;
    var checksLength = checks.length;
    var lastCheck = checks[checksLength-1].idCheck;
    console.log("numero de tareas pendientes (inclusive la actual): " + checksLength);
    console.log('Currentcheck: ' + currentCheck)

    

    $scope.nextCheck = function (){

      $scope.reviewedFeedbackResult.arrayCheckResults.push({"idCheck": $scope.idCheckToShow,
                                                              "result": "ok",
                                                              "comments": "no"});

      console.log($scope.reviewedFeedbackResult);

                                                          
      if(currentCheck == lastCheck){
       
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentReviewed, $scope.reviewedFeedbackResult)
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
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentReviewed, $scope.reviewedFeedbackResult)
        .then(function(response) {
          console.log('put perfect');
          $localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
        })
        .catch(function(response) {
          console.error('Error', response.status, response.data);
        })
        .finally(function() {
          
        });

        //Aquí actualizo las variables relativas a la próxima check que se mostrará en la app
        currentCheck = currentCheck + 1;
        $scope.idCheckToShow = checks[currentCheck].idCheck;
        $scope.checkToShow = checks[currentCheck];
        $scope.descriptionToShow = checks[currentCheck].description;
        $scope.typeCheckToShow = checks[currentCheck].typeCheck;

      }
      
    }	

    $scope.improveCheck = function (idCheckToShow){
      console.log("improveCheck");
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
    
    /*$scope.newFeedbackResult = $localStorage.newFeedbackResult;
		console.log($scope.newFeedbackResult);
		$scope.idFeedback = $scope.newFeedbackResult.idFeedback;
    console.log($scope.idFeedback);
    
    console.log($localStorage.reviewedFeedbackResult);
    $scope.reviewedFeedbackResult = $localStorage.reviewedFeedbackResult;
    console.log($scope.reviewedFeedbackResult);
    $scope.idFeedback = $localStorage.reviewedFeedbackResult.idFeedback;
    console.log($scope.idFeedback);

    
    //Obtener las checks que hay que mostrar
    var checks = $localStorage.checks


    $scope.idCheckToShow = checks[0].idCheck;
    $scope.checkToShow = checks[0];
    $localStorage.idCheckToShow = $scope.idCheckToShow;
    $scope.descriptionToShow = checks[0].description;
    $scope.typeCheckToShow = checks[0].typeCheck;
    var currentCheck = $scope.idCheckToShow;
    var checksLength = checks.length;
    var lastCheck = checks[checksLength-1].idCheck;
    console.log("numero de tareas pendientes (inclusive la actual): " + checksLength);
    console.log('Currentcheck: ' + currentCheck)

    /*
    //$rootScope.idFeedback = $rootScope.newFeedbackResult.idFeedback;

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


      $localStorage.reviewedFeedbackResult.arrayCheckResults.push({"idCheck": $scope.idCheckToShow,
                                                              "result": "ok",
                                                              "comments": "no"});


                                                          
      if(currentCheck == lastCheck){
       
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentReviewed, $localStorage.reviewedFeedbackResult)
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
        
        $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentReviewed, $localStorage.reviewedFeedbackResult)
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
        $scope.idCheckToShow = checks[currentCheck].idCheck;
        $scope.checkToShow = checks[currentCheck];
        $scope.descriptionToShow = checks[currentCheck].description;
        $scope.typeCheckToShow = checks[currentCheck].typeCheck;
        

      }
      
    }	

    $scope.improveCheck = function (idCheckToShow){
      console.log("improveCheck");
      $localStorage.idCheckToShow = idCheckToShow;
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

*/