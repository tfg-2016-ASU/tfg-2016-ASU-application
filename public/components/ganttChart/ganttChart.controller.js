(function () {
  'use strict';

  angular
    .module('app')
    .controller('GanttChartController', GanttChartController);

  GanttChartController.$inject = ['$scope', '$rootScope'];

  function GanttChartController($scope, $rootScope) {
	
    console.log("GanttChartController initialized");
	
    

  }

}());