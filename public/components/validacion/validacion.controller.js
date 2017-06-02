(function () {
  'use strict';

  angular
    .module('app')
    .controller('ValidacionController', ValidacionController);

  ValidacionController.$inject = ['$scope'];

  function ValidacionController($scope) {
	
    console.log("ValidacionController initialized");
	
    $scope.formData = {};
 
    $scope.submitForm = function () {
        
      if($scope.exampleForm.$invalid){
        return false;
      }else{
        console.log('perfect');
      }
    };
  }

}());