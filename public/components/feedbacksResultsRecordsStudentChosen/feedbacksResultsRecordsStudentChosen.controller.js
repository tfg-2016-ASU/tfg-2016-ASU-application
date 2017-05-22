(function () {
  'use strict';

  angular
    .module('app')
    .controller('FeedbacksResultsRecordsStudentChosenController', FeedbacksResultsRecordsStudentChosenController);

  FeedbacksResultsRecordsStudentChosenController.$inject = ['$scope', '$http', '$localStorage'];

  function FeedbacksResultsRecordsStudentChosenController($scope, $http, $localStorage) {
	
    console.log("FeedbacksResultsRecordsStudentChosenController initialized");

    $scope.idFeedbackChosen = $localStorage.idFeedbackChosen;
    $scope.studentChosen = $localStorage.studentChosen;

    $http.get('/api/feedbacksResults/' + $scope.idFeedbackChosen + '/' +  $scope.studentChosen)
    .then(function(response) {
        $scope.studentResultChosen = response.data[0];
        console.log($scope.studentResultChosen);
    })
    .catch(function(response) {
        console.error('Feedbacks results error', response.status, response.data);
    })
    .finally(function() {
        console.log("Successful request to feedbacks results");
    });


  }

}());