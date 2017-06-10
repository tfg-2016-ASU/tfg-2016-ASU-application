(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', '$scope', '$location', '$localStorage', '$interval'];


  function HomeController(authService, $scope, $location, $localStorage, $interval) {

    //console.log(user.user_metadata.full_name);


    var vm = this;
    vm.authService = authService;

    
    $scope.bye = function(){
      console.log('byeeee');
      $scope.studentLogged = undefined;
      $localStorage.$reset();
      authService.logout();
    }

    authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
      console.log(vm.profile.given_name);
      console.log(vm.profile.family_name);
      var full_name = vm.profile.given_name + " " + vm.profile.family_name;
      //console.log(vm.profile.user_metadata.full_name);
      $scope.urlPicture = vm.profile.picture;
      console.log($scope.urlPicture);
      if(vm.profile.user_metadata == undefined){
        $localStorage.studentLogged = full_name;
        $scope.studentLogged = $localStorage.studentLogged; 
      }else{
        $localStorage.studentLogged = vm.profile.user_metadata.full_name;
        $scope.studentLogged = $localStorage.studentLogged;
      }
      console.log($localStorage.studentLogged);
     
      
    });
    
    $scope.startTimer = function(){

      var arr = "2014-01-01 00:00:00".split(/[- :]/),
      date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
      
      var d;
      d = date;
      
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
