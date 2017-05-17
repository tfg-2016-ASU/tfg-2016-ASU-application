(function () {
  'use strict';

  angular
    .module('app')
    .controller('CrosscheckController', CrosscheckController);

  CrosscheckController.$inject = ['$scope'];

  function CrosscheckController($scope) {
	
    console.log("CrosscheckController initialized");
	
    var vm = this;

  }

}());