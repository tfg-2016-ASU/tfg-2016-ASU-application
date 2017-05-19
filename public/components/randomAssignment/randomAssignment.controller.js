(function () {
  'use strict';

  angular
    .module('app')
    .controller('RandomAssignmentController', RandomAssignmentController);

  RandomAssignmentController.$inject = ['$scope', '$localStorage', '$http'];

  function RandomAssignmentController($scope, $localStorage, $http) {
	
    console.log("RandomAssignmentController initialized");

    $scope.newFeedbackResult = $localStorage.newFeedbackResult;
		$scope.idFeedback = $scope.newFeedbackResult.idFeedback;
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
        console.log($scope.myReviewer);

        if($scope.myReviewer == ''){

          console.log('entro en el if');
        
      
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

                    $scope.reviewedFeedbackResultStudent2 = elegido;
                    $scope.reviewedFeedbackResultStudent1 =  $scope.newFeedbackResult;
                    
                  
                    //modificar los reviewers de cada uno, y a uno de los dos ponerle waiting='si'

                    $scope.reviewedFeedbackResultStudent2.reviewer = $scope.student1;
                    $scope.reviewedFeedbackResultStudent1.reviewer = $scope.student2;
                    $scope.reviewedFeedbackResultStudent1.waiting = 'si';
                  
                    console.log($scope.reviewedFeedbackResultStudent2);
                    console.log($scope.reviewedFeedbackResultStudent1);
                  

                    $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.reviewedFeedbackResultStudent2.student, $scope.reviewedFeedbackResultStudent2)
                    .then(function(response) {
                      console.log('perfect');           
                    })
                    .catch(function(response) {
                      console.log('error');
                    })
                    .finally(function() {
                    console.log('finished');
                    });
                    
                    $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.reviewedFeedbackResultStudent1.student, $scope.reviewedFeedbackResultStudent1)
                    .then(function(response) {
                      console.log('perfect');        
                    })
                    .catch(function(response) {
                      console.log('error');
                    })
                    .finally(function() {
                      console.log('finished');
                    });


                    break;


                  }
                }
              

              })
              .catch(function(response) {
                console.log('error');
              })
              .finally(function() {
                console.log('finished');
              });

              
              $scope.arrayAux = ['pera', 'manzana', 'platano'];

        }else if($scope.myReviewer != ''){
          console.log('entro en el else');
          $scope.student2 = $scope.myReviewer;
          $scope.withAssignment = ['e1', 'e2'];
          console.log($scope.withAssignment.length);
        }


        })
      .catch(function(response) {
        console.log('error');
      })
      .finally(function() {
        console.log('finished');
      });

  }
  }

}());