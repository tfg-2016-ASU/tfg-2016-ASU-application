(function () {
  'use strict';

  angular
    .module('app')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope', '$http', '$location'];

  function AdminController($scope, $http, $location) {
	
    console.log("AdminController initialized");
	
    $http.get('api/v1/feedman/subjects/findDistinctSubjects')
      .then(function(response) {
          console.log(response.data);
          $scope.subjects = response.data;
      })
      .catch(function(response) {
          console.error('error', response.status, response.data);
      })
      .finally(function() {
          //console.log("Feedbacks results showed");
      });

    $scope.viewSubject = function(s){
      console.log(s);
    }

    $scope.deleteSubject = function(s){
      console.log(s);
        $http.delete('api/v1/feedman/subjects/' + s)
          .then(function(response) {
              console.log('delete perfect');
          })
          .catch(function(response) {
              console.error('error', response.status, response.data);
          })
          .finally(function() {
              $location.path('/admin');
          });
    }

  }

}());