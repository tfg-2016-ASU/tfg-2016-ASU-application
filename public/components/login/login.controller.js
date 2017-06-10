(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService', '$localStorage'];

  function LoginController(authService, $localStorage) {

    
    var vm = this;
    vm.authService = authService;

  }

}());
