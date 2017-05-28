(function () {
  'use strict';

  angular
    .module('app')
    .controller('ByeController', ByeController);

  ByeController.$inject = ['$scope', '$http'];

  function ByeController($scope, $http) {
	
    console.log("ByeController initialized");
  

  }

}());