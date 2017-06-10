(function () {
  'use strict';

  angular
    .module('app')
    .controller('ByeController', ByeController);

  ByeController.$inject = ['$scope', '$http', '$localStorage', 'authService', '$location'];

  function ByeController($scope, $http, $localStorage, authService, $location) {
	
    console.log("ByeController initialized");

    var vm = this;
    vm.authService = authService;

    
    $scope.bye = function(){
      console.log('byeeee');
      $localStorage.$reset();
      authService.logout();
    }
  }

}());