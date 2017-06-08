(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService'];

  function LoginController(authService) {

    $localStorage.$reset();
    var vm = this;
    vm.authService = authService;

  }

}());
