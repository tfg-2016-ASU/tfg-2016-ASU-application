(function () {
  'use strict';

  angular
    .module('app')
    .controller('ByeController', ByeController);

  ByeController.$inject = ['$scope', '$http'];

  function ByeController($scope, $http) {
	
    console.log("ByeController initialized");
    
    $http.get('/api/feedbacksInformation/' + 1)
    .then(function(response) {      
      
      console.log(perfec);
    })
    .catch(function(response) {
      console.error('Show preparation error', response.status, response.data);
    })
    .finally(function() {
      console.log("Preparation showed");
    });

  }

}());