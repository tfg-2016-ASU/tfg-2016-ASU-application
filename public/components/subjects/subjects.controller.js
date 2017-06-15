(function () {
  'use strict';

  angular
    .module('app')
    .controller('SubjectsController', SubjectsController);

  SubjectsController.$inject = ['$scope', '$state', '$stateParams', '$http'];

  function SubjectsController($scope, $state, $stateParams, $http) {
	
    console.log("SubjectsController initialized");
	
    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;

    $http.get('api/v1/feedman/subjects/' + $scope.subject)
      .then(function(response) {
          console.log(response.data);
          $scope.editions = response.data;
      })
      .catch(function(response) {
          console.error('error', response.status, response.data);
      })
      .finally(function() {
          //console.log("Feedbacks results showed");
      });

    $scope.deleteEdition = function(e){
      console.log(e);
        $http.delete('api/v1/feedman/subjects/' + e.subject + '/' + e.edition)
          .then(function(response) {
              console.log('delete perfect');
              $state.reload();
          })
          .catch(function(response) {
              console.error('error', response.status, response.data);
          })
          .finally(function() {
              $location.path('/admin');
          });
    }

    $scope.addEdition = function(e){
      console.log(e);
      var newSubject = {
				"subject": $scope.subject,
				"edition": e,
        "teachers": [],
        "init": "",
        "end": ""
			};
        $http.post('api/v1/feedman/subjects/', newSubject)
          .then(function(response) {
              console.log('added perfect');
              $state.reload();
          })
          .catch(function(response) {
              console.error('error', response.status, response.data);
          })
          .finally(function() {
              //$location.path('/admin');
          });
    }

    $scope.deleteTeacher = function(t, e){
      console.log(t);
      console.log(e.teachers);
      var i;
      for(i=0; i<e.teachers.length; i++){
        if(e.teachers[i]==t){
          e.teachers.splice(i,1);
        }
      }
      console.log(e);
      
      $http.put('api/v1/feedman/subjects/' + e.subject + '/' + e.edition, e)
        .then(function(response) {
            console.log('put perfect');
            $state.reload();
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            
        });
    }

    $scope.addTeacher = function(t, e){
      e.teachers.push(t);
      console.log(e);
      $http.put('api/v1/feedman/subjects/' + e.subject + '/' + e.edition, e)
        .then(function(response) {
            console.log('put perfect');
            $state.reload();
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            
        });
    }    

    $scope.startEdition = function(e){
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1; //January is 0
      var year = new Date().getFullYear();
      if(day<10){
          day='0'+day;
      } 
      if(month<10){
          month='0'+month;
      } 
      
      var today = day + '/' + month + '/' + year; 
      console.log(today);
      e.init = today;

      $http.put('api/v1/feedman/subjects/' + e.subject + '/' + e.edition, e)
        .then(function(response) {
            console.log('put perfect');
            //$state.reload();
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            
        });
    } 


    $scope.finishEdition = function(e){
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1; //January is 0
      var year = new Date().getFullYear();
      if(day<10){
          day='0'+day;
      } 
      if(month<10){
          month='0'+month;
      } 
      
      var today = day + '/' + month + '/' + year; 
      console.log(today);
      e.end = today;

      $http.put('api/v1/feedman/subjects/' + e.subject + '/' + e.edition, e)
        .then(function(response) {
            console.log('put perfect');
            //$state.reload();
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            
        });
    }       


  }

}());