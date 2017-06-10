(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChecksDetailController', ChecksDetailController);

  ChecksDetailController.$inject = ['$scope', '$stateParams'];

  function ChecksDetailController($scope, $stateParams) {
	
    console.log("ChecksDetailController initialized");
	
    

  }

}());