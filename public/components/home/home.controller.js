(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', '$scope', '$location', '$localStorage', '$interval'];


  function HomeController(authService, $scope, $location, $localStorage, $interval) {

    //console.log(user.user_metadata.full_name);
    if($localStorage.selected != undefined){
      $scope.subject = $localStorage.selected.subject;
      $scope.edition = $localStorage.selected.edition;
    }


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
       var minutesLeft = 5;

        var countDownDate = new Date();
        console.log(countDownDate);
        countDownDate.setMinutes(countDownDate.getMinutes()+minutesLeft);
        console.log(countDownDate);
        countDownDate = countDownDate.getTime();
        $localStorage.countDownDate = countDownDate;

        $scope.lessOneMinute = false;
        $scope.lessTenSeconds = false; 
        var tick = function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            $scope.clock = minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(tick);
                $scope.clock = "EXPIRED";
            }
            if (minutes < 1) {
                $scope.lessOneMinute = true;
            }
            if (minutes < 1 && seconds < 10) {
                $scope.lessTenSeconds = true;
            }
        }
        tick();
        $interval(tick, 1000);
    }
    
    
  }
  

}());
