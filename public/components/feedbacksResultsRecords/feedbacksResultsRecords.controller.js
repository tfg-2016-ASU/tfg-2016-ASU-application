(function () {
  'use strict';

  angular
    .module('app')
    .controller('FeedbacksResultsRecordsController', FeedbacksResultsRecordsController);

  FeedbacksResultsRecordsController.$inject = ['$scope', '$http', '$localStorage'];

  function FeedbacksResultsRecordsController($scope, $http, $localStorage) {
	
    console.log("FeedbacksResultsRecordsController initialized");

		$http.get('/api/findDistinctIdFeedbacks/')
		.then(function(response) {
			$scope.differentsFeedbacks = response.data;
			console.log($scope.differentsFeedbacks);
		})
		.catch(function(response) {
			console.error('Feedbacks results error', response.status, response.data);
		})
		.finally(function() {
			console.log("Successful request to feedbacks results");
		});


    $scope.chooseIdFeedback = function(f){
      console.log(f);
      $localStorage.idFeedbackChosen = f;
    }

  }

}());