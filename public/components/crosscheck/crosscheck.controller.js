(function () {
  'use strict';

  angular
    .module('app')
    .controller('CrosscheckController', CrosscheckController);

  CrosscheckController.$inject = ['$scope', '$localStorage', '$state', '$stateParams', '$http'];

  function CrosscheckController($scope, $localStorage, $state, $stateParams, $http) {
	
    console.log("CrosscheckController initialized");
	
    $scope.state = $state.current
    $scope.params = $stateParams; 
    console.log($scope.params);
    $scope.idFeedback = $scope.params.idFeedback;
    $scope.subject = $scope.params.subject;
    $scope.edition = $scope.params.edition;

    $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback)
        .then(function(response) {
            $scope.totalChecks = response.data[0].checks.length;  
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
        });  
    
    $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback)
        .then(function(response) {
            console.log(response.data);
            $scope.feedbacks = response.data;  
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
         });  

    $scope.refresh = function(){
        $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback)
        .then(function(response) {
            console.log(response.data);
            $scope.feedbacks = response.data;  
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
         });  
    }    

    $scope.setFilter = function(filter){
        console.log(filter);
        $scope.arrayChecks = filter;
        var i, check;
        var arrayChecks = [];
        for(i=0; i<filter.length; i++){
            if(filter.charAt(i) != ',' && filter.charAt(i) != ' '){
                if(filter.charAt(i+1) != ',' && filter.charAt(i) != ' ' && filter.charAt(i) != undefined){
                    check = filter.charAt(i) + filter.charAt(i+1);
                    i++;
                }else{
                    check = filter.charAt(i);
                }
                console.log(check);
                arrayChecks.push(check);
            }
        }
        
        console.log(arrayChecks);
        //$localStorage.filter = filter;
        $localStorage.filter = arrayChecks;
    }   

  }

}());