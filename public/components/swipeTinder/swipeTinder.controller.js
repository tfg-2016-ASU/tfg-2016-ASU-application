(function () {
  'use strict';

  angular
    .module('app')
    .controller('SwipeTinderController', SwipeTinderController);

  SwipeTinderController.$inject = ['$scope'];

  function SwipeTinderController($scope) {
	
    console.log("SwipeTinderController initialized");
	
    $(document).ready(function () {
        
        // Define cards
        var cards = [
          new Tindercardsjs.card(2, 'Tarea 2', 'Se debe tener, al menos, dos planes: Uno premium con 1000 peticiones y uno básico que permita como máximo 10 peticiones', '/images/cabecera-swipe.png'),
          new Tindercardsjs.card(1, 'Tarea 1', 'Tener aplicadas las cabeceras CORS en la API', '/images/cabecera-swipe.png'),
          new Tindercardsjs.card(0, 'Tarea 0', 'Haber hecho al menos un commit cerrando alguna issue desde la última sesión de Feedback', '/images/cabecera-swipe.png')
        ];
        
        // Render cards
        Tindercardsjs.render(cards, $('#main'), function (event) {
          console.log('Swiped ' + event.direction + ', cardid is ' + event.cardid + ' and target is:');
          console.log(event.card);
        });
      });

  }

}());