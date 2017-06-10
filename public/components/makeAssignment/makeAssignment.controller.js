(function () {
  'use strict';

  angular
    .module('app')
    .controller('MakeAssignmentController', MakeAssignmentController);

  MakeAssignmentController.$inject = ['$scope', '$http', '$localStorage'];

  function MakeAssignmentController($scope, $http, $localStorage) {
	
    console.log("MakeAssignmentController initialized");

    

    $http.get('/api/feedbacksInformation')
        .then(function(response) {
            $scope.feedbacksInf = response.data;
            //console.log('Feedback result added correctly!');	
        })
        .catch(function(response) {
            //console.error('Feedbacks results error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
        });
	

    $scope.assignStudents = function(){

      
        var reviewers = [];
        var revieweds = [];

        $http.get('/api/feedbacksResults/findReviewersPreparedSameShift/' + $scope.feedbackAssign + '/' + $scope.shiftAssign)
            .then(function(response) {
                reviewers = response.data;
                $http.get('/api/feedbacksResults/findReviewedsPreparedSameShift/' + $scope.feedbackAssign + '/' + $scope.shiftAssign)
                .then(function(response) {
                    revieweds = response.data;
                    //Asignar un reviewer por reviewed
                    //Para esta versión supongo que hay el mismo número de reviewers que de revieweds.
                    
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
                                if(arrayReviewedsAssigned.length>0){ //Segundo filtro: comprobar que ese reviewed no hasido elegido antes
                                    
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
                        rd.reviewer = rr.student;
                        $http.put('/api/feedbacksResults/' + rr.idFeedback + '/' + rr.student, rr)
                            .then(function(response) {
                                console.log(rr.student);
                            })
                            .catch(function(response) {
                                console.error('Feedbacks results error', response.status, response.data);
                            })
                            .finally(function() {
                            });

                        $http.put('/api/feedbacksResults/' + rd.idFeedback + '/' + rd.student, rd)
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