(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResumeController', ResumeController);

  ResumeController.$inject = ['$scope'];

  function ResumeController($scope) {
	
    console.log("ResumeController initialized");
	
    var vm = this;

  }

}());