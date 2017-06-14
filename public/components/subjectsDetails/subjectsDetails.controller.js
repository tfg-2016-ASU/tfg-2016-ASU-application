(function () {
  'use strict';

  angular
    .module('app')
    .controller('SubjectsDetailsController', SubjectsDetailsController);

  SubjectsDetailsController.$inject = ['$scope'];

  function SubjectsDetailsController($scope) {
	
    console.log("SubjectsDetailsController initialized");
	
    var vm = this;

  }

}());