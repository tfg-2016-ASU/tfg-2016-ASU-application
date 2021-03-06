(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChecksController', ChecksController);

  ChecksController.$inject = ['$scope', '$stateParams'];

  function ChecksController($scope, $stateParams) {
	
    console.log("ChecksController initialized");
    console.log($scope.idCheck);
    

  }

}());


/*(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChecksController', ChecksController);

  ChecksController.$inject = ['$scope', '$rootScope', '$http', '$location', '$localStorage'];

  function ChecksController($scope, $rootScope, $http, $location, $localStorage) {
	
    console.log("ChecksController initialized");
    
    console.log($localStorage.reviewedFeedbackResult);      

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
      $scope.punctuation = checks[$localStorage.currentCheck].punctuation;
      console.log('id check to show: ' + $scope.idCheckToShow);
      console.log('punctuation to show: ' + $scope.punctuation);
    }

    

/*
    $scope.idCheckToShow = checks[0].idCheck;
    $scope.checkToShow = checks[0];
    $scope.descriptionToShow = checks[0].description;
    $scope.typeCheckToShow = checks[0].typeCheck;
    var currentCheck = $scope.idCheckToShow;
    var checksLength = checks.length;
    var lastCheck = checks[checksLength-1].idCheck;
    console.log("numero de tareas pendientes (inclusive la actual): " + checksLength);
    console.log('Currentcheck: ' + currentCheck)

    */
/*
    

    $scope.nextCheck = function (){


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
                                                              "comments": "no"
                                                             });

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
          $scope.punctuation = checks[$scope.idCheckToShow].punctuation;
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
          $scope.punctuation = checks[$scope.idCheckToShow].punctuation;
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
     /*   
      }
      
    }	

    $scope.improveCheck = function (idCheckToShow, punctuation){
      $localStorage.currentCheck = idCheckToShow;
      $localStorage.punctuation = punctuation;
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
  

}());*/

