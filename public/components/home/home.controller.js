(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', '$scope', '$location', '$localStorage', '$interval', '$state', '$http'];


  function HomeController(authService, $scope, $location, $localStorage, $interval, $state, $http) {

    $scope.selected = {'subject': '', 'edition': ''};

    $http.get('api/v1/feedman/subjects/findDistinctSubjects')
        .then(function(response) {
            console.log(response.data);
            $scope.subjects = response.data;
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
        });

    $scope.hasChanged = function(){
        console.log($scope.selected.subject);
        $http.get('api/v1/feedman/subjects/' + $scope.selected.subject)
        .then(function(response) {
            console.log(response.data);
            $scope.editions = response.data;
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
        });
    }    

    $scope.selectSubject = function(selected){
        console.log(selected);
        $localStorage.selected = selected;
    }


    authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
      //console.log(vm.profile.given_name);
      //console.log(vm.profile.family_name);
      var full_name = vm.profile.given_name + " " + vm.profile.family_name;
      $scope.email = vm.profile.email;
      $scope.urlPicture = vm.profile.picture;
      //console.log($scope.urlPicture);
      if(vm.profile.user_metadata == undefined){
        $localStorage.studentLogged = full_name;
        $scope.studentLogged = $localStorage.studentLogged; 
      }else{
        $localStorage.studentLogged = vm.profile.user_metadata.full_name;
        $scope.studentLogged = $localStorage.studentLogged;
      }
      //console.log($localStorage.studentLogged);     
      
    });
    //console.log(user.user_metadata.full_name);
    if($localStorage.selected != undefined){
      $scope.subject = $localStorage.selected.subject;
      $scope.edition = $localStorage.selected.edition;
      
      $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition)
        .then(function(response) {
          
          $scope.teachers = response.data[0].teachers;
          var i;
          $scope.isTeacher = false;
          for(i=0; i<$scope.teachers.length; i++){
            if($scope.teachers[i] == $scope.email){
               $scope.isTeacher = true;
               break;
            }
          }     
        })
        .catch(function(response) {
        })
        .finally(function() {
        });
      

      

    }



    var vm = this;
    vm.authService = authService;
    $scope.isAdmin = vm.authService.isAdmin();
  

    
    $scope.bye = function(){
      $scope.studentLogged = undefined;
      $localStorage.$reset();
      authService.logout();
    }


    
    $scope.startTimer = function(){
       var minutesLeft = 5;

        var countDownDate = new Date();
       
        countDownDate.setMinutes(countDownDate.getMinutes()+minutesLeft);
     
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
                $scope.clock = "TIME OUT";
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
