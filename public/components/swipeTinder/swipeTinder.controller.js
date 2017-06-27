(function () {
  'use strict';

  angular
    .module('app')
    .controller('SwipeTinderController', SwipeTinderController);

  SwipeTinderController.$inject = ['$scope', '$http', '$location', '$localStorage', '$interval', '$stateParams', '$state'];

  function SwipeTinderController($scope, $http, $location, $localStorage, $interval, $stateParams, $state) {
	
    console.log("SwipeTinderController initialized");
    console.log($stateParams.param1);

    $scope.state = $state.current
    $scope.params = $stateParams; 
		console.log($scope.params);
		$scope.subject = $scope.params.subject;
		$scope.edition = $scope.params.edition;  

    //------------Countdown--------------
      $scope.lessOneMinute = false;
      $scope.lessTenSeconds = false;
      var countDownDate = $localStorage.countDownDate;
      var tick = function() {
      var now = new Date().getTime();
          var distance = countDownDate - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if(minutes.toString().length == 1){
        minutes = '0' + minutes;
      }
      if(seconds.toString().length == 1){
        seconds = '0' + seconds;
      }    
      $scope.clock = minutes + "m " + seconds + "s ";
        console.log($scope.clock);
        if (distance < 0) {
          clearInterval(tick);
          $scope.clock = "TIME OUT";
        }
        if (minutes < 1) {
          $scope.lessOneMinute = true;
        }
        if (minutes < 1 && seconds < 10) {
          $scope.lessTenSeconds = true;
        }
      }
      tick();
      $interval(tick, 1000);
    //-----------------------------------

      $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.rw)
      .then(function(response) {
        //console.log('put perfect');
        console.log(response.data[0]);
        $localStorage.reviewedFeedbackResult = response.data[0];
        //console.log($localStorage.reviewedFeedbackResult);
      })
      .catch(function(response) {
        console.log('error');
      })
      .finally(function() {
        //console.log('finish');
      });

    
    $scope.idFeedback = $localStorage.idFeedback;
    //console.log($localStorage.rw);
   
    $scope.totalChecks = $localStorage.checks.length;

        
      $http.get('api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksInformation/' + $scope.idFeedback)
      .then(function(response) {

//-----------------------------------------------------------------------------------------------------------------------------
        if($stateParams.param1 != null){
          $scope.feedbacksResultsSwipe = response.data[0].checks;
          //Define cards
          var cards2 = [];
          var i;
          var idCheckToPush;
          var idCheckToPushWithTitle;
          var descriptionToPush;
        
          idCheckToPush = $scope.feedbacksResultsSwipe[$stateParams.param1-1].idCheck;
          idCheckToPushWithTitle = 'Check ' + $scope.feedbacksResultsSwipe[$stateParams.param1-1].idCheck;
          descriptionToPush = $scope.feedbacksResultsSwipe[$stateParams.param1-1].description;
          cards2.push(new Tindercardsjs.card(idCheckToPush, idCheckToPushWithTitle, descriptionToPush, '/images/cabecera-swipe.png'));
          
          console.log(cards2);


            

          var arrayRes = [];

          //-----------------------------Hammer---------------------------------/
          var myElement = document.getElementById('main');
          //var myElement2 = document.getElementById('myElement');
          //myElement2.style.backgroundColor = '#be9d56';
          // create a simple instance
          // by default, it only adds horizontal recognizers
          
          var mc = new Hammer(myElement);
          
          // listen to events...
          /*mc.on("panleft panright tap press", function(ev) {
              console.log(ev.type +" gesture detected.");
              myElement2.textContent = ev.type +" gesture detected.";
          })*/
          
          //console.log('IMPORTANTE: ' + $scope.checkShowed);
            

          mc.on('pan', function(ev) {

                        
            
            //console.log(ev);
            if(ev.deltaX>0){
              //console.log('verde');
              //myElement2.textContent = 'verde';
              //myElement.style.backgroundColor = 'green';
              var $card;
              $card = cards2[0].tojQuery().css({
                'position': 'absolute',
                'border': '3px solid #666',
                'border-radius': '10px',
                'borderColor': 'green',
                'height': '230px',
                'left': '10px',
                'top': '10px',
                'right': '10px'
              });
              
            }else if(ev.deltaX<0){
              //console.log('rojo');
              //myElement2.textContent = 'rojo';
              myElement.style.borderColor = 'red';
              var $card;
              $card = cards2[0].tojQuery().css({
                'position': 'absolute',
                'border': '3px solid #666',
                'border-radius': '10px',
                'borderColor': 'red',
                'height': '230px',
                'left': '10px',
                'top': '10px',
                'right': '10px'
              });
            }else{
              //console.log('amarillo');
              //myElement2.textContent = 'amarillo';
              //myElement.style.backgroundColor = 'yellow';
            }
          });

          // Render cards
          Tindercardsjs.render(cards2, $('#main'), function (event) {
            //console.log('render card');
            //console.log('Swiped ' + event.direction + ', cardid is ' + event.cardid + ' and target is:');
            console.log(event.cardid);
            
            
            $scope.cardid = event.cardid;
          
            //auxCheckColor--;
            var result;
            $scope.direction = event.direction;
            $scope.deltaX = event.deltaX;
            //console.log('deltax: ' + $scope.deltaX);
            if(event.direction == 'right'){
              result = 'ok';
              //console.log(result);
            }else if(event.direction == 'left'){
              result = 'no';
            }
            
            console.log($localStorage.reviewedFeedbackResult.arrayCheckResults);
            $localStorage.reviewedFeedbackResult.arrayCheckResults.splice($stateParams.param1-1,1);
            
            $localStorage.reviewedFeedbackResult.arrayCheckResults.splice($stateParams.param1-1, 0, {"idCheck": $stateParams.param1,
                            "result": result,
                            "corrected": "no",
                            "comments": "no"
                          });
            console.log($localStorage.reviewedFeedbackResult.arrayCheckResults);

            $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.rw, $localStorage.reviewedFeedbackResult)
              .then(function(response) {
                //console.log('put perfect');
              })
              .catch(function(response) {
                console.log('error');
              })
              .finally(function() {
                //console.log('finish');
                //$location.path('/resume');
                $state.go('resume', {subject: $scope.subject, edition: $scope.edition})
              });
              
            
            
          });
        

        }else{
        
          $scope.feedbacksResultsSwipe = response.data[0].checks;
          $scope.lastCheckSwipe = response.data[0].checks[response.data[0].checks.length-1].idCheck;
          $scope.checkShowed = response.data[0].checks[0].idCheck;
          //Para la barra de progreso de la app:
          var aux = $scope.checkShowed;
          var progress = Math.round(aux/$scope.lastCheckSwipe * 100);
          
          //console.log(Math.round(aux/$scope.lastCheckSwipe * 100));

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
            idCheckToPushWithTitle = 'Check ' + $scope.feedbacksResultsSwipe[i].idCheck;
            descriptionToPush = $scope.feedbacksResultsSwipe[i].description;
            cards2.push(new Tindercardsjs.card(idCheckToPush, idCheckToPushWithTitle, descriptionToPush, '/images/cabecera-swipe.png'));
          }
          console.log(cards2);
          var auxCheckColor = 2;

          var arrayRes = [];

            //-----------------------------Hammer---------------------------------/
            var myElement = document.getElementById('main');
            //var myElement2 = document.getElementById('myElement');
            //myElement2.style.backgroundColor = '#be9d56';
            // create a simple instance
            // by default, it only adds horizontal recognizers
            var mc = new Hammer(myElement);

            // listen to events...
            /*mc.on("panleft panright tap press", function(ev) {
                console.log(ev.type +" gesture detected.");
                myElement2.textContent = ev.type +" gesture detected.";
            })*/
            
            //console.log('IMPORTANTE: ' + $scope.checkShowed);
            

              

            mc.on('pan', function(ev) {
                          
              
              //console.log(ev);
              if(ev.deltaX>0){
                //console.log('verde');
                //myElement2.textContent = 'verde';
                //myElement.style.backgroundColor = 'green';
                var $card;
                $card = cards2[auxCheckColor].tojQuery().css({
                  'position': 'absolute',
                  'border': '3px solid #666',
                  'border-radius': '10px',
                  'borderColor': 'green',
                  'height': '230px',
                  'left': '10px',
                  'top': '10px',
                  'right': '10px'
                });
                
              }else if(ev.deltaX<0){
                //console.log('rojo');
                //myElement2.textContent = 'rojo';
                myElement.style.borderColor = 'red';
                var $card;
                $card = cards2[auxCheckColor].tojQuery().css({
                  'position': 'absolute',
                  'border': '3px solid #666',
                  'border-radius': '10px',
                  'borderColor': 'red',
                  'height': '230px',
                  'left': '10px',
                  'top': '10px',
                  'right': '10px'
                });
              }else{
                //console.log('amarillo');
                //myElement2.textContent = 'amarillo';
                //myElement.style.backgroundColor = 'yellow';
              }
            });
              
            // Render cards
            Tindercardsjs.render(cards2, $('#main'), function (event) {
              //console.log('render card');
              //console.log('Swiped ' + event.direction + ', cardid is ' + event.cardid + ' and target is:');
              //console.log(event.card);
              
              $scope.cardid = event.cardid;
            
              auxCheckColor--;
              var result;
              $scope.direction = event.direction;
              $scope.deltaX = event.deltaX;
              //console.log('deltax: ' + $scope.deltaX);
              if(event.direction == 'right'){
                result = 'ok';
                //console.log(result);
              }else if(event.direction == 'left'){
                result = 'no';
              }
              

              arrayRes.push({"idCheck": aux,
                              "result": result,
                              "corrected": "no",
                              "comments": "no"
                            });

              console.log((arrayRes));
              
              //+++++++++++++++++++++++++++++++++++++
              $http.get('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.rw)
                .then(function(response) {
                  //console.log('her we go ' + response.data[0].student);
                  response.data[0].arrayCheckResults = arrayRes;
                  $localStorage.reviewedFeedbackResult = response.data[0];
                  //console.log($localStorage.rw);
                  
                  $http.put('/api/v1/feedman/subjects/' + $scope.subject + '/' + $scope.edition + '/feedbacksResults/' + $localStorage.idFeedback + '/' + $localStorage.rw, response.data[0])
                    .then(function(response) {
                      //console.log('put perfect');
                    })
                    .catch(function(response) {
                      console.log('error');
                    })
                    .finally(function() {
                      //console.log('finish');
                    });
                })
                .catch(function(response) {
                  console.log('error');
                })
                .finally(function() {
                  //console.log('finish');
                });
                //++++++++++++++++++++++++++++++++++++++
              

              if(event.cardid == $scope.lastCheckSwipe){
                console.log('entro en el if');

                aux--;
                
                //$location.path('/finish');
                $state.go('finish', {subject: $scope.subject, edition: $scope.edition})

                //console.log($localStorage.rw);

    
                
              
              }
              
              aux++;
              var progress = Math.round(aux/$scope.lastCheckSwipe * 100);
              //console.log(Math.round(aux/$scope.lastCheckSwipe * 100));
              //$( "div.demo-container" ).html("<p class='center-align'>Todas las tareas están evaluadas</p>");
              $( "div.demo-container" ).html("<p class='center-align'>Check "+aux+ "/" + $scope.lastCheckSwipe);
              $( "div.progress" ).html("<div class='determinate' style='width:"+ progress +"%'></div>");

            });          

        }
//-----------------------------------------------------------------------------------------------------------------------------        
        

 
        //-------------------------------------------------------------------------------- 
        




      })
      .catch(function(response) {
        console.error('Feedbacks results error', response.status, response.data);
      })
      .finally(function() {
        //console.log("Successful request to feedbacks results");
      });

        
    //});

   
  }

}());