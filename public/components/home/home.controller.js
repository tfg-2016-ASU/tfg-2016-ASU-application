(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', '$scope', '$location'];


  function HomeController(authService, $scope, $location) {

  
    
    var vm = this;
    vm.authService = authService;


    authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
    });
    
    

  }
  

}());
