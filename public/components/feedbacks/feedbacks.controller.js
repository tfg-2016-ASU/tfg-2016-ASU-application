(function () {
  'use strict';

  angular
    .module('app')
    .controller('FeedbacksController', FeedbacksController);

  FeedbacksController.$inject = ['$scope', '$state', '$stateParams', '$http', '$localStorage'];

  function FeedbacksController($scope, $state, $stateParams, $http, $localStorage) {
	
    console.log("FeedbacksController initialized");
	
    $scope.state = $state.current
    $scope.params = $stateParams; 
    console.log($scope.params);
    $scope.subject = $scope.params.subject;

  

    $http.get('api/v1/feedman/subjects/' + $scope.subject)
      .then(function(response) {
          console.log(response.data);
          var i;
          var subjects = [];
          for(i=0; i<response.data.length; i++){
              if(response.data[i].end == ""){
                subjects.push(response.data[i]);
              }
          }
          $scope.subjects = subjects;
      })
      .catch(function(response) {
          console.error('error', response.status, response.data);
      })
      .finally(function() {
          //console.log("Feedbacks results showed");
      });

    $scope.editionSelected = function(){
        $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.editionChosen + '/feedbacksInformation')
        .then(function(response) {
            console.log(response.data);
            $scope.feedbacks = response.data;
            
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
        });  
    }

    $scope.addFeedback = function(newFB){
        var newFB = {
            "subject": $scope.subject,
            "edition": $scope.editionChosen,
            "idFeedback": parseInt(newFB),
            "punctuation": 0,
            "preparation": [],
            "checks": [],
            "init": ""
        }
        console.log(newFB);
        $http.post('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.editionChosen + '/feedbacksInformation', newFB)
            .then(function(response) {
                console.log(response.data);
                $scope.editionSelected();
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            });  

    }
    
    $scope.deleteFeedback = function(f){
        $http.delete('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.editionChosen + '/feedbacksInformation/'+ f.idFeedback)
            .then(function(response) {
                console.log("deleted");
                $scope.editionSelected();
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            }); 
    }

    $scope.viewFeedbackResults = function(id, edition, subject){
        console.log(id);
        $state.go('feedbacksResults', {idFeedback: id, subject: subject, edition: edition});
    }

  }

}());