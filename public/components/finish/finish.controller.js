(function () {
  'use strict';

  angular
    .module('app')
    .controller('FinishController', FinishController);

  FinishController.$inject = ['$scope', '$rootScope'];

  function FinishController($scope, $rootScope) {
	
    console.log("FinishController initialized");
	
    console.log($rootScope.idFeedback);

  }

}());