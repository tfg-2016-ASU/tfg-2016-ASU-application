(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService', '$localStorage'];

  function LoginController(authService, $localStorage) {

    $localStorage.relo = 1;
    var vm = this;
    vm.authService = authService;

  }

}());
