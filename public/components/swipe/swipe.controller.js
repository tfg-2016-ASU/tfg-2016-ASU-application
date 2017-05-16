  (function () {
  'use strict';

  angular
    .module('app')
    .controller('demoSwipeCtrl', demoSwipeCtrl);

  demoSwipeCtrl.$inject = ['$scope'];

  function demoSwipeCtrl($scope) {
	
    console.log("demoSwipeCtrl initialized");
	
    $scope.onSwipeLeft = function(ev) {
      alert('You swiped left!!');
    };

    $scope.onSwipeRight = function(ev) {
      alert('You swiped right!!');
    };
    $scope.onSwipeUp = function(ev) {
      alert('You swiped up!!');
    };

    $scope.onSwipeDown = function(ev) {
      alert('You swiped down!!');
    };

  }

}());