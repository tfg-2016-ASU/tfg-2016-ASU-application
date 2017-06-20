(function () {
  'use strict';

  angular
    .module('app')
    .controller('FeedbacksResultsController', FeedbacksResultsController);

  FeedbacksResultsController.$inject = ['$scope', '$state', '$stateParams', '$http'];

  function FeedbacksResultsController($scope, $state, $stateParams, $http) {
	
    console.log("FeedbacksResultsController initialized");
	
    $scope.state = $state.current
    $scope.params = $stateParams; 
    console.log($scope.params);
    $scope.subject = $scope.params.subject;
    $scope.edition = $scope.params.edition;
    $scope.idFeedback = $scope.params.idFeedback;

    $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $scope.idFeedback)
        .then(function(response) {
            console.log(response.data);
            $scope.results = response.data;
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
        });  



  }

}());