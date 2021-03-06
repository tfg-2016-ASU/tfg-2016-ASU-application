(function () {
  'use strict';

  angular
    .module('app')
    .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['$scope', '$localStorage', '$http', '$location', '$interval', '$state', '$stateParams'];

  function WaitingController($scope, $localStorage, $http, $location, $interval, $state, $stateParams) {
	
    console.log("WaitingController initialized");

    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition;  

    $scope.rw = $localStorage.rw;
	
    $scope.idFeedback = $localStorage.idFeedback;

    $scope.totalChecks = $localStorage.checks.length;

    $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' +  $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentLogged)
        .then(function(response) {      
          //$scope.waiting = response.data[0].waiting;
          console.log(response.data[0].arrayCheckResults);
          $scope.checksReviewed = response.data[0].arrayCheckResults.length;
        })
        .catch(function(response) {
          console.error('error', response.status, response.data);
        })
        .finally(function() {
          console.log("finished");
        });

    //$scope.reviewer = $localStorage.RWDEF.student;
    
    //console.log($localStorage.RWDEF.reviewer);

    //$localStorage.resultsConfirmed = false;
    

    $scope.beginReview = function(){
      $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.studentLogged)
        .then(function(response) {      
          //$scope.waiting = response.data[0].waiting;
          console.log(response.data[0].arrayCheckResults);

          if(response.data[0].confirmed == 1 || response.data[0].confirmed == 2){
            $state.go('confirmMyResult', {subject: $scope.subject, edition: $scope.edition});
          }
          
          $scope.checksReviewed = response.data[0].arrayCheckResults.length;
        

          
          //$scope.checksReviewed = response.data[0].arrayChecksResults.length;
          //console.log(response.data[0].arrayChecksResults.length);
        })
        .catch(function(response) {
          console.error('error', response.status, response.data);
        })
        .finally(function() {
          console.log("finished");
        });
        //si waiting es 'no' enconces entro en el if y voy a la pantalla siguiente
        /*console.log($localStorage.student);
        $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $localStorage.RWDEF.reviewer)
        .then(function(response) {      
          $scope.waiting = response.data[0].waiting;
          console.log($scope.waiting);
          if($scope.waiting == 'no'){
            $location.path('/confirmMyResult');
          }
        })
        .catch(function(response) {
          console.error('error', response.status, response.data);
        })
        .finally(function() {
          console.log("finished");
        });
        */

    }

  

  }

}());