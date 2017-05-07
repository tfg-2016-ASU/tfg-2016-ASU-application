(function () {
  'use strict';

  angular
    .module('app')
    .controller('ImproveCheckController', ImproveCheckController);

  ImproveCheckController.$inject = ['$scope'];

  function ImproveCheckController($scope) {
	
    console.log("ImproveCheckController initialized");
	
    var vm = this;

  }

}());