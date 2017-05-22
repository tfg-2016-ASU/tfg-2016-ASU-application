(function () {
  'use strict';

  angular
    .module('app')
    .controller('FeedbacksResultsRecordsStudentsController', FeedbacksResultsRecordsStudentsController);

  FeedbacksResultsRecordsStudentsController.$inject = ['$scope', '$http', '$localStorage'];

  function FeedbacksResultsRecordsStudentsController($scope, $http, $localStorage) {
	
    console.log("FeedbacksResultsRecordsStudentsController initialized");

    $scope.idFeedbackChosen = $localStorage.idFeedbackChosen;
	
    $http.get('/api/feedbacksResults/' + $localStorage.idFeedbackChosen)
    .then(function(response) {
        $scope.feedbacksResultsHistorial = response.data;
        console.log($scope.feedbacksResultsHistorial);
    })
    .catch(function(response) {
        console.error('Feedbacks results error', response.status, response.data);
    })
    .finally(function() {
        console.log("Successful request to feedbacks results");
    });

    $scope.chooseStudent = function(student){
        $localStorage.studentChosen = student;
        console.log($localStorage.studentChosen);
    }

  }

}());