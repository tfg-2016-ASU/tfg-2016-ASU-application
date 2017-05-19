(function () {
  'use strict';

  angular
    .module('app')
    .controller('CrosscheckController', CrosscheckController);

  CrosscheckController.$inject = ['$scope', '$localStorage'];

  function CrosscheckController($scope, $localStorage) {
	
    console.log("CrosscheckController initialized");
	
    $scope.checks = $localStorage.checks;
    console.log($localStorage.checks);

  }

}());