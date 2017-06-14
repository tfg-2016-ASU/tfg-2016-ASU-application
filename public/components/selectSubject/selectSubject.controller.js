(function () {
  'use strict';

  angular
    .module('app')
    .controller('SelectSubjectController', SelectSubjectController);

  SelectSubjectController.$inject = ['$scope', '$http', '$localStorage'];

  function SelectSubjectController($scope, $http, $localStorage) {
	
    console.log("SelectSubjectController initialized");
	
    var vm = this;

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

    $scope.hasChanged = function(){
        console.log($scope.selected.subject);
        $http.get('api/v1/feedman/subjects/' + $scope.selected.subject)
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
    }    

    $scope.selectSubject = function(selected){
        console.log(selected);
        $localStorage.selected = selected;
    }



  }

}());