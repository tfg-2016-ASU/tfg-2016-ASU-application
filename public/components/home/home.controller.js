(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', '$scope'];

  function HomeController(authService, $scope) {

    var vm = this;
    vm.authService = authService;


    authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
    });
    
    

  }
  

}());
