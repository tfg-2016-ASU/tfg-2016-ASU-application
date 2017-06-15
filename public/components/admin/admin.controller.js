(function () {
  'use strict';

  angular
    .module('app')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope', '$http', '$location', '$state'];

  function AdminController($scope, $http, $location, $state) {
	
    console.log("AdminController initialized");
	
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

    $scope.viewSubject = function(s){
      console.log(s);
    }

    $scope.deleteSubject = function(s){
      console.log(s);
        $http.delete('api/v1/feedman/activeSubjects/' + s)
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

    $scope.viewSubject = function(s){
      console.log(s);
      $state.go('subjects', {subject: s});
    }    

    $scope.addSubject = function(s){
      console.log(s);
      var newSubject = {
				"subject": s,
				"editions": []
			};
        $http.post('api/v1/feedman/activeSubjects/', newSubject)
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