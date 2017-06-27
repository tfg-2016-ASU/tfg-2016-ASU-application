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
    $scope.shift = $scope.params.shift;

    $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback)
        .then(function(response) {
            $scope.totalChecks = response.data[0].checks.length;  
            console.log($scope.totalChecks);
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
            $state.reload(); 
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


   $scope.assignStudents = function(){
    console.log($scope.idFeedback);
    console.log($scope.shift);

      
    var reviewers = [];
    var revieweds = [];

    $http.get('/api/v1/feedman/feedbacksResults/findReviewersPreparedSameShift/' + $scope.idFeedback + '/' + $scope.shift)
        .then(function(response) {
            reviewers = response.data;
            $http.get('/api/v1/feedman/feedbacksResults/findReviewedsPreparedSameShift/' + $scope.idFeedback + '/' + $scope.shift)
            .then(function(response) {
                revieweds = response.data;
                //Asignar un reviewer por reviewed
                //Para esta versión supongo que hay el mismo número de reviewers que de revieweds.
                console.log(reviewers);
                console.log(revieweds);
                
                var i, j, m, reviewer, reviewed;
                var arrayAssignment = [];
                var arrayReviewedsAssigned = [];
                var jsonObj = {};
                var reviewedChosenBefore = false;
                for(i=0; i<reviewers.length; i++){
                    reviewer = reviewers[i];
                    reviewed = "";
                    
                    for(j=0; j<revieweds.length; j++){
                        reviewedChosenBefore = false;
                        if(revieweds[j].group != reviewer.group){ //Primer filtro: pasan los revieweds que no son de mi grupo
                            if(arrayReviewedsAssigned.length>0){ //Segundo filtro: comprobar que ese reviewed no ha sido elegido antes
                                
                                for(m=0; m<arrayReviewedsAssigned.length; m++){
                                    if(revieweds[j] == arrayReviewedsAssigned[m]){
                                        reviewedChosenBefore = true;
                                    }
                                }
                                if(reviewedChosenBefore == false){
                                    reviewed = revieweds[j];
                                    arrayReviewedsAssigned.push(reviewed);
                                    break;
                                }
                                
                            }else{
                                
                                reviewed = revieweds[j];
                                arrayReviewedsAssigned.push(reviewed);
                                break;
                                
                            }
                        }
                    }
                    //arrayAssignment.push([reviewer,reviewed]);
                    jsonObj = {'reviewer': reviewer, 'reviewed': reviewed};
                    console.log(jsonObj);
                    arrayAssignment.push(jsonObj);
                    
                }

                console.log(arrayAssignment);
                $scope.arrayAssignment = arrayAssignment;
                $localStorage.arrayAssignment = arrayAssignment;
                
                //Modificar todos los reviewers de todos los estudiantes
                var p;
                for(p=0; p<$scope.arrayAssignment.length; p++){
                    var rr = arrayAssignment[p].reviewer;
                    var rd = arrayAssignment[p].reviewed;
                    console.log(rr);
                    rr.reviewer = rd.student;
                    rr.reviewed = rd.student;
                    rd.reviewer = rr.student;
                    $http.put('/api/v1/feedman/subjects/sos/16-17/feedbacksResults/' + rr.idFeedback + '/' + rr.student, rr)
                        .then(function(response) {
                            console.log(rr.student);
                        })
                        .catch(function(response) {
                            console.error('Feedbacks results error', response.status, response.data);
                        })
                        .finally(function() {
                        });

                    $http.put('/api/v1/feedman/subjects/sos/16-17/feedbacksResults/' + rd.idFeedback + '/' + rd.student, rd)
                        .then(function(response) {
                            console.log(rd.student);
                        })
                        .catch(function(response) {
                            console.error('Feedbacks results error', response.status, response.data);
                        })
                        .finally(function() {
                        });
                        
                }
                
                
            })
            .catch(function(response) {
                console.error('Feedbacks results error', response.status, response.data);
            })
            .finally(function() {
            });

        })
        .catch(function(response) {
            console.error('Feedbacks results error', response.status, response.data);
        })
        .finally(function() {
        });    
   } 

  }

}());