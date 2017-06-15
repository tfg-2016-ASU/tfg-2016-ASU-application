(function () {
  'use strict';

  angular
    .module('app')
    .controller('SubjectsController', SubjectsController);

  SubjectsController.$inject = ['$scope', '$state', '$stateParams', '$http'];

  function SubjectsController($scope, $state, $stateParams, $http) {
	
    console.log("SubjectsController initialized");
	
    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;

    $http.get('api/v1/feedman/subjects/' + $scope.subject)
      .then(function(response) {
          console.log(response.data);
          $scope.editions = response.data;
      })
      .catch(function(response) {
          console.error('error', response.status, response.data);
      })
      .finally(function() {
          //console.log("Feedbacks results showed");
      });

    $scope.deleteEdition = function(e){
      console.log(e);
        $http.delete('api/v1/feedman/subjects/' + e.subject + '/' + e.edition)
          .then(function(response) {
              console.log('delete perfect');
              $state.reload();
          })
          .catch(function(response) {
              console.error('error', response.status, response.data);
          })
          .finally(function() {
              $location.path('/admin');
          });
    }

    $scope.addEdition = function(e){
      console.log(e);
      var newSubject = {
				"subject": $scope.subject,
				"edition": e,
        "teachers": [],
        "init": "",
        "end": ""
			};
        $http.post('api/v1/feedman/subjects/', newSubject)
          .then(function(response) {
              console.log('added perfect');
              $state.reload();
          })
          .catch(function(response) {
              console.error('error', response.status, response.data);
          })
          .finally(function() {
              //$location.path('/admin');
          });
    }

    $scope.deleteTeacher = function(e){
      console.log(e);
        $http.delete('api/v1/feedman/subjects/' + e.subject + '/' + e.edition)
          .then(function(response) {
              console.log('delete perfect');
              $state.reload();
          })
          .catch(function(response) {
              console.error('error', response.status, response.data);
          })
          .finally(function() {
              $location.path('/admin');
          });
    }

    $scope.addTeacher = function(e){
      console.log(e);
      var newSubject = {
				"subject": $scope.subject,
				"edition": e,
        "teachers": [],
        "init": "",
        "end": ""
			};
        $http.post('api/v1/feedman/subjects/', newSubject)
          .then(function(response) {
              console.log('added perfect');
              $state.reload();
          })
          .catch(function(response) {
              console.error('error', response.status, response.data);
          })
          .finally(function() {
              //$location.path('/admin');
          });
    }    

  }

}());