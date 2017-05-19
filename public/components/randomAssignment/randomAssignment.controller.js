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
      console.log(withAssignment);


      var j;
      var elegido;
      if(feedbacksOtherGroup.length>=1){
        for(j=0; j<feedbacksOtherGroup.length; j++){
          elegido = feedbacksOtherGroup[j];
          withAssignment.push(elegido.student);
          console.log(withAssignment);

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
          
        
          //modificar los reviewers de cada uno

          $scope.reviewedFeedbackResultStudent2.reviewer = $scope.student1;
          $scope.reviewedFeedbackResultStudent1.reviewer = $scope.student2;
         
          console.log($scope.reviewedFeedbackResultStudent2);
          console.log($scope.reviewedFeedbackResultStudent1);
        

          $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.reviewedFeedbackResultStudent2.student, $scope.reviewedFeedbackResultStudent2)
          .then(function(response) {
            console.log('all perfect');            
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            console.log("Finished");
          });
          
          $http.put('/api/feedbacksResults/' + $scope.idFeedback + '/' + $scope.reviewedFeedbackResultStudent1.student, $scope.reviewedFeedbackResultStudent1)
          .then(function(response) {
            console.log('all perfect');            
          })
          .catch(function(response) {
            console.error('Error', response.status, response.data);
          })
          .finally(function() {
            console.log("Finished");
          });


          break;


        }
      }
     

		})
		.catch(function(response) {
			console.error('Feedbacks results error', response.status, response.data);
		})
		.finally(function() {
			console.log("Successful request to feedbacks results");
		});

    
    $scope.arrayAux = ['pera', 'manzana', 'platano'];

  }

}());