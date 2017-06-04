(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', '$scope', '$location', '$localStorage', '$interval'];


  function HomeController(authService, $scope, $location, $localStorage, $interval) {

    //console.log(user.user_metadata.full_name);
    $localStorage.$reset();
    
    var vm = this;
    vm.authService = authService;


    authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
      $localStorage.studentLogged = vm.profile.user_metadata.full_name;
    });
    
    $scope.startTimer = function(){
      var d;
      d = new Date('2014-01-01 00:00:00');
      
      var tick = function() {
          $scope.clock = d;
          $localStorage.clock = d;
          d.setSeconds(d.getSeconds() + 1);
          $localStorage.clock = d;
      }
      tick();
      $interval(tick, 1000);
    }
    

  }
  

}());
