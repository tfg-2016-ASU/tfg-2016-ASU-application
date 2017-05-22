(function () {
  'use strict';

  angular
    .module('app')
    .controller('RandomAssignmentController', RandomAssignmentController);

  RandomAssignmentController.$inject = ['$scope',  '$localStorage', '$http', '$location'];

  function RandomAssignmentController($scope, $localStorage, $http, $location) {
	
    console.log("RandomAssignmentController initialized");


    console.log($localStorage.newFeedbackResult);

    
    
    $scope.newFeedbackResult = $localStorage.newFeedbackResult;
    $scope.idFeedback = $scope.newFeedbackResult.idFeedback;
    $localStorage.idFeedback = $scope.idFeedback;
    $scope.shift = $scope.newFeedbackResult.shift;
    $scope.group = $scope.newFeedbackResult.group;
    $scope.student = $scope.newFeedbackResult.student;
    
    
    
    

    //Comprobar si ya tengo alguien asignado o no:
    
    /*$scope.isThereReviewer = function(){
      $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
      .then(function(response) {      
        $scope.myReviewer = response.data[0].reviewer;
        console.log($scope.myReviewer);
      })
      .catch(function(response) {
        c
      })
      .finally(function() {
        
      });
    }

    $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
      .then(function(response) {      
        $scope.myReviewer = response.data[0].reviewer;
        console.log($scope.myReviewer);
*/
    $scope.isThereReviewer = function(){
      $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
      .then(function(response) {      
        
        $scope.myReviewer = response.data[0].reviewer;
        console.log('¿tengo myreviewer?' + $scope.myReviewer);

        
        $localStorage.myReviewer =  $scope.myReviewer;

        if($scope.myReviewer == ''){

          console.log('No, entro en el if');
        
      
              $http.get('/api/findStudentsPreparedSameShift/' + $scope.idFeedback + '/' + $scope.shift)
              .then(function(response) {
                $localStorage.feedbacksResults = response.data;
                $scope.feedbacksResults = response.data;

                var feedbacks = $scope.feedbacksResults;
                var feedbacksOtherGroup = [];
                var i;
                for(i=0; i<feedbacks.length; i++){
                  if(feedbacks[i].group != $scope.group){
                    feedbacksOtherGroup.push(feedbacks[i]);
                  }
                }

                

                //feedbacks.splice(i,1);
                //$scope.feedbacksResults=feedbacksOtherGroup;
                //console.log($scope.feedbacksResults);

                var withAssignment = [];
                withAssignment.push($scope.student);
                

                var j;
                var elegido;
                if(feedbacksOtherGroup.length>=1){
                  for(j=0; j<feedbacksOtherGroup.length; j++){
                    elegido = feedbacksOtherGroup[j];
                    withAssignment.push(elegido.student);
                  

                    //Quiero crear un array donde no aparezcan los asignados
                    var k;
                    var withoutAssignment = [];
                    for(k=0; k<$scope.feedbacksResults.length; k++){
                      if($scope.feedbacksResults[k].student != $scope.student && $scope.feedbacksResults[k].student != elegido.student){
                        withoutAssignment.push($scope.feedbacksResults[k]);
                      }
                    }
                    

                    $scope.feedbacksResults = withoutAssignment;
                    $localStorage.feedbacksResults = $scope.feedbacksResults;


                    $scope.withAssignment = withAssignment;

                    
                    $scope.student1 = $scope.student;
                    $scope.student2 = elegido.student;
                    $localStorage.myReviewer = $scope.student2;
                    console.log('student1: ' + $scope.student1);
                    console.log('student2: ' + $scope.student2);
                    

                    $scope.reviewedFeedbackResultStudent2 = elegido;
                    $scope.reviewedFeedbackResultStudent1 =  $scope.newFeedbackResult;
                    $scope.myReviewer = $scope.newFeedbackResult;;
                  
                    //modificar los reviewers de cada uno, y a uno de los dos ponerle waiting='si'

                    $scope.reviewedFeedbackResultStudent2.reviewer = $scope.student1;
                    $scope.reviewedFeedbackResultStudent1.reviewer = $scope.student2;
                   
                    $scope.reviewedFeedbackResultStudent1.waiting = 'no';
                    $localStorage.reviewedFeedbackResultStudent2 = $scope.reviewedFeedbackResultStudent2;
                    console.log('feedback de mi reviewed: ' + $localStorage.reviewedFeedbackResultStudent2.student);
                    $localStorage.RWDEF = $localStorage.reviewedFeedbackResultStudent2;

                    $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.reviewedFeedbackResultStudent2.student, $scope.reviewedFeedbackResultStudent2)
                    .then(function(response) {
                    })
                    .catch(function(response) {
                    })
                    .finally(function() {
                    });
                    
                    $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.reviewedFeedbackResultStudent1.student, $scope.reviewedFeedbackResultStudent1)
                    .then(function(response) {
                    })
                    .catch(function(response) {
                    })
                    .finally(function() {
                    });


                    break;


                  }
                }
              

              })
              .catch(function(response) {
              })
              .finally(function() {
              });

              
              

        }else if($scope.myReviewer != ''){
          console.log('Si, tengo reviwer, entro en el else');
          $scope.student2 = $scope.myReviewer;
          console.log('myreviewer: ' + $scope.student2);
          $scope.withAssignment = ['e1', 'e2'];
          $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.myReviewer)
            .then(function(response) {      
            $localStorage.RWDEF = response.data[0];
            })
            .catch(function(response) {
            })
            .finally(function() {
            });

        }


        })
      .catch(function(response) {
      })
      .finally(function() {
      });

    }

    $scope.iHaveToWaiting = function(){
        console.log($localStorage.RWDEF);
        console.log('iHaveToWaiting?')
        //$localStorage.student = $scope.student;
        //console.log('yo: ' + $localStorage.student);
        $localStorage.student = $scope.student2;
        console.log($localStorage.student);
        $http.get('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.student)
        .then(function(response) {      
          $scope.waiting = response.data[0].waiting;
          //$scope.rw = response.data[0].reviewer;
          //$scope.reviewedFeedbackResult = response.data[0];
          //$localStorage.rw = $scope.rw;
          //$localStorage.reviewedFeedbackResult = $scope.reviewedFeedbackResult;
          //$localStorage.studentReviewed = response.data[0].reviewer;
          //$localStorage.reviewedFeedbackResult = response.data[0];
          //console.log('RW: ' + response.data[0].reviewer);
          //$localStorage.rw = response.data[0].reviewer;
          console.log($scope.waiting);
          if($scope.waiting == 'no'){
            $location.path('/swipeTinder');
          }else{
            $location.path('/waiting');
          }      
        })
        .catch(function(response) {
        })
        .finally(function() {
        });
        
    }  
   

  }

}());


