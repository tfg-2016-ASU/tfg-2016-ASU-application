(function () {
  'use strict';

  angular
    .module('app')
    .controller('TimeController', TimeController);

  TimeController.$inject = ['$scope', '$interval', '$localStorage'];

  function TimeController($scope, $interval, $localStorage) {
	
    console.log("TimeController initialized");
	/*
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
    */
  }

}());