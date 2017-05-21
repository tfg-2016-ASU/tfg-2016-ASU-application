(function () {
  'use strict';

  angular
    .module('app')
    .controller('NewFeedbackInformationController', NewFeedbackInformationController);

  NewFeedbackInformationController.$inject = ['$scope'];

  function NewFeedbackInformationController($scope) {
	
    console.log("NewFeedbackInformationController initialized");
	
    var vm = this;

  }

}());