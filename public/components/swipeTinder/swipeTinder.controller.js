(function () {
  'use strict';

  angular
    .module('app')
    .controller('SwipeTinderController', SwipeTinderController);

  SwipeTinderController.$inject = ['$scope', '$http'];

  function SwipeTinderController($scope, $http) {
	
    console.log("SwipeTinderController initialized");

	
    $(document).ready(function () {
        
        $http.get('/api/feedbacksInformation/' + '1')
        .then(function(response) {
          $scope.feedbacksResultsSwipe = response.data[0].checks;

          // Define cards
          /*var cards = [
            new Tindercardsjs.card(2, 'Tarea 2', 'Se debe tener, al menos, dos planes: Uno premium con 1000 peticiones y uno básico que permita como máximo 10 peticiones', '/images/cabecera-swipe.png'),
            
            new Tindercardsjs.card(1, 'Tarea 1', 'Tener aplicadas las cabeceras CORS en la API', '/images/cabecera-swipe.png'),
            
            new Tindercardsjs.card(0, 'Tarea 0', 'Haber hecho al menos un commit cerrando alguna issue desde la última sesión de Feedback', '/images/cabecera-swipe.png')
          ];*/
        

          //Define cards
          var cards2 = [];
          var i;
          var idCheckToPush;
          var idCheckToPushWithTitle;
          var descriptionToPush;

          for(i= $scope.feedbacksResultsSwipe.length-1; i>-1; i--){
            idCheckToPush = $scope.feedbacksResultsSwipe[i].idCheck;
            idCheckToPushWithTitle = 'Tarea ' + $scope.feedbacksResultsSwipe[i].idCheck;
            descriptionToPush = $scope.feedbacksResultsSwipe[i].description;
            cards2.push(new Tindercardsjs.card(idCheckToPush, idCheckToPushWithTitle, descriptionToPush, '/images/cabecera-swipe.png'));
          }
          
          console.log(cards2);

            
          // Render cards
          Tindercardsjs.render(cards2, $('#main'), function (event) {
            console.log('Swiped ' + event.direction + ', cardid is ' + event.cardid + ' and target is:');
            console.log(event.card);
          });



        })
        .catch(function(response) {
          console.error('Feedbacks results error', response.status, response.data);
        })
        .finally(function() {
          console.log("Successful request to feedbacks results");
        });

        
    });

  }

}());