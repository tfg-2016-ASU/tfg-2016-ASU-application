(function () {
  'use strict';

  angular
    .module('app')
    .controller('TeacherController', TeacherController);

  TeacherController.$inject = ['$scope', '$http', '$location', '$state'];

  function TeacherController($scope, $http, $location, $state) {
	
    console.log("TeacherController initialized");
	
	
    $http.get('api/v1/feedman/activeSubjects')
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

  }

}());