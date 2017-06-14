(function () {
  'use strict';

  angular
    .module('app')
    .controller('SubjectsController', SubjectsController);

  SubjectsController.$inject = ['$scope'];

  function SubjectsController($scope) {
	
    console.log("SubjectsController initialized");
	
    var vm = this;

  }

}());