(function () {
  'use strict';

  angular
    .module('app')
    .controller('FeedbacksInformationController', FeedbacksInformationController);

  FeedbacksInformationController.$inject = ['$scope', '$http', '$state', '$stateParams'];

  function FeedbacksInformationController($scope, $http, $state, $stateParams) {
	
    console.log("FeedbacksInformationController initialized");
	
    $scope.state = $state.current
    $scope.params = $stateParams; 
    console.log($scope.params);
    $scope.subject = $scope.params.subject;
    $scope.idFeedback = $scope.params.idFeedback;
    $scope.edition = $scope.params.edition;

    $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback)
        .then(function(response) {
            console.log(response.data);
            $scope.feedback = response.data[0];      
        })
        .catch(function(response) {
            console.error('error', response.status, response.data);
        })
        .finally(function() {
            //console.log("Feedbacks results showed");
        }); 

    $scope.editPunctuation = function(p){
        $scope.feedback.punctuation = parseFloat(p);
        console.log($scope.feedback);
        $http.put('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback, $scope.feedback)
            .then(function(response) {
                console.log('updated');
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            });  
    }    

    $scope.editPreparation = function(id, p, feedback){
        feedback.preparation[id].description = p;
        
        $http.put('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback, feedback)
            .then(function(response) {
                console.log('updated');
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            });  
    }    

    $scope.newPreparation = function(newDescription, feedback){
        console.log(newDescription);
        console.log(feedback.preparation.length);
        var newPreparation = {
            "idPreparation": feedback.preparation.length,
            "description": newDescription
        };
        feedback.preparation.push(newPreparation);
    
        $http.put('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback, feedback)
            .then(function(response) {
                console.log('updated');
                $state.reload();
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            }); 
    }        


    $scope.editCheck = function(id, c, feedback){
        feedback.preparation[id].description = p;
        
        $http.put('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback, feedback)
            .then(function(response) {
                console.log('updated');
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            });  
    }    

    $scope.newCheck = function(newCheckDescription, feedback){
        console.log(newCheckDescription);
        console.log(feedback.checks.length);
        var newCheck = {
            "idCheck": feedback.preparation.length + 1,
            "description": newCheckDescription
        };

        
        feedback.checks.push(newCheck);
        console.log(feedback);
        
        
        $http.put('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback, feedback)
            .then(function(response) {
                console.log('updated');
                $state.reload();
            })
            .catch(function(response) {
                console.error('error', response.status, response.data);
            })
            .finally(function() {
                //console.log("Feedbacks results showed");
            }); 
    }  


}

    
  

}());