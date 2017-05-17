(function () {
  'use strict';

  angular
    .module('app')
    .controller('StateFeedbackController', StateFeedbackController);

  StateFeedbackController.$inject = ['$scope'];

  function StateFeedbackController($scope) {
	
    console.log("StateFeedbackController initialized");
	
    var vm = this;

  }

}());