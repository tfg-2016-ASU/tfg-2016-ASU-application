(function () {
  'use strict';

  angular
    .module('app')
    .controller('CrosscheckStudentController', CrosscheckStudentController);

  CrosscheckStudentController.$inject = ['$scope', '$state', '$stateParams', '$http', '$localStorage'];

  function CrosscheckStudentController($scope, $state, $stateParams, $http, $localStorage) {
	
    console.log("CrosscheckStudentController initialized");
	
    $scope.state = $state.current
    $scope.params = $stateParams; 
    console.log($scope.params);
    $scope.idFeedback = $scope.params.idFeedback;
    $scope.subject = $scope.params.subject;
    $scope.edition = $scope.params.edition;
    $scope.student = $scope.params.student;

    console.log('filter: ' + $localStorage.filter)
    $scope.filter = $localStorage.filter;

    $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback)
        .then(function(response) {
            console.log(response.data);
            $scope.checks = response.data[0].checks; 
            $localStorage.originalChecks = response.data[0].checks; 
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
         });  

    $scope.changed = function(){
        console.log('cambie');
        console.log($scope.filterActivated);
        if($scope.filterActivated == 'si'){
            var i, j;
            var checksFiltered = [];
            for(i=0; i<$scope.checks.length; i++){
                for(j=0; j<$localStorage.filter.length; j++){
                    if($scope.checks[i].idCheck == $localStorage.filter[j]){
                        checksFiltered.push($scope.checks[i]);
                    }
                }
                
            }
            $scope.checks = checksFiltered;
        }
        if($scope.filterActivated == 'no'){
            $scope.checks = $localStorage.originalChecks;
        }
    }


    $scope.negativeCrosscheck = function(id){
        console.log(id);
        $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
            .then(function(response) {
                response.data[0].arrayCheckResults[id-1]['crosscheck']='no';
                console.log(response.data[0].arrayCheckResults[id-1]);
                
                console.log(response.data[0]);
                $http.put('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student, response.data[0])
                    .then(function(response) {
                        console.log('updated');
                    })
                    .catch(function(response) {
                        console.error('error', response.status, response.data);
                    })
                    .finally(function() {
                        //console.log("Feedbacks results showed");
                    }); 
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            }); 
    }

    $scope.positiveCrosscheck = function(id){
        console.log(id);
        $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
            .then(function(response) {
                response.data[0].arrayCheckResults[id-1]['crosscheck']='ok';
                console.log(response.data[0].arrayCheckResults[id-1]);
                
                console.log(response.data[0]);
                $http.put('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student, response.data[0])
                    .then(function(response) {
                        console.log('updated');
                    })
                    .catch(function(response) {
                        console.error('error', response.status, response.data);
                    })
                    .finally(function() {
                        //console.log("Feedbacks results showed");
                    }); 
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            }); 
    }

  }

}());