(function () {
  'use strict';

  angular
    .module('app')
    .controller('ByeController', ByeController);

  ByeController.$inject = ['$scope'];

  function ByeController($scope) {
	
    console.log("ByeController initialized");
	

  }

}());