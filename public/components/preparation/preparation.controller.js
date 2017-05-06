(function () {
  'use strict';

  angular
    .module('app')
    .controller('PreparationController', PreparationController);

  PreparationController.$inject = ['$scope', '$http', '$rootScope'];

  function PreparationController($scope, $http, $rootScope) {

    console.log("PreparationController initialized");


    $http.get('/api/feedbacksInformation/' + $rootScope.idFeedback)
    .then(function(response) {
      $rootScope.preparation = response.data[0].preparation;
      $rootScope.checks = response.data[0].checks;
      console.log($rootScope.preparation);
    })
    .catch(function(response) {
      console.error('Show preparation error', response.status, response.data);
    })
    .finally(function() {
      console.log("Preparation showed");
    });

    
    



    


  }

}());