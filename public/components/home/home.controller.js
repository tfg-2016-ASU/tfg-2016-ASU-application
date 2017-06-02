(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', '$scope', '$location', '$localStorage'];


  function HomeController(authService, $scope, $location, $localStorage) {

    //console.log(user.user_metadata.full_name);
    $localStorage.$reset();
    
    var vm = this;
    vm.authService = authService;


    authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
      $localStorage.studentLogged = vm.profile.user_metadata.full_name;
    });
    
    

  }
  

}());
