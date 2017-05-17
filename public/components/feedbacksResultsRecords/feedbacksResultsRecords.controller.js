(function () {
  'use strict';

  angular
    .module('app')
    .controller('FeedbacksResultsRecordsController', FeedbacksResultsRecordsController);

  FeedbacksResultsRecordsController.$inject = ['$scope'];

  function FeedbacksResultsRecordsController($scope) {
	
    console.log("FeedbacksResultsRecordsController initialized");
	
    var vm = this;

  }

}());