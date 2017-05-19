(function () {
  'use strict';

  angular
    .module('app')
    .controller('CrosscheckSelectFeedbackController', CrosscheckSelectFeedbackController);

  CrosscheckSelectFeedbackController.$inject = ['$scope', '$localStorage'];

  function CrosscheckSelectFeedbackController($scope, $localStorage) {
	
    console.log("CrosscheckSelectFeedbackController initialized");
	
    $scope.storeIdFeedback = function(){
        $localStorage.idFeedback = $scope.idFeedback;
        console.log($localStorage.idFeedback);
    }

  }

}());