(function () {
  'use strict';

  angular
    .module('app')
    .controller('BeginSecondReviewController', BeginSecondReviewController);

  BeginSecondReviewController.$inject = ['$scope'];

  function BeginSecondReviewController($scope) {
	
    console.log("BeginSecondReviewController initialized");
	
    var vm = this;

  }

}());