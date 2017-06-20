(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'ngStorage', 'ngMaterial'])
    .config(config);

  config.$inject = ['$stateProvider','lockProvider', '$urlRouterProvider', 'jwtOptionsProvider', '$qProvider'];

 
  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false); //para el error de transition superseded
    $stateProvider
      .state('selectSubject', {
        url: '/selectSubject',
        controller: 'SelectSubjectController',
        templateUrl: 'components/selectSubject/selectSubject.html',
        controllerAs: 'vm'
      })
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'components/login/login.html',
        controllerAs: 'vm'
      })
      .state('time', {
        url: '/time',
        controller: 'TimeController',
        templateUrl: 'components/time/time.html',
        controllerAs: 'vm'
      })
      .state('studentInformation', {
        url: '/:subject/:edition/studentInformation',
        controller: 'StudentInformationController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/studentInformation/studentInformation.html',
        controllerAs: 'vm'
      })
      .state('preparation', {
        url: '/:subject/:edition/preparation',
        controller: 'PreparationController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/preparation/preparation.html',
        controllerAs: 'vm'
      })
      .state('selectRole', {
        url: '/:subject/:edition/selectRole',
        controller: 'SelectRoleController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/selectRole/selectRole.html',
        controllerAs: 'vm'
      })
      .state('makeAssignment', {
        url: '/makeAssignment',
        controller: 'MakeAssignmentController',
        templateUrl: 'components/makeAssignment/makeAssignment.html',
        controllerAs: 'vm'
      })
      .state('assign', {
        url: '/:subject/:edition/assign',
        controller: 'AssignController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/assign/assign.html',
        controllerAs: 'vm'
      })
      .state('beginReview', {
        url: '/:subject/:edition/beginReview',
        controller: 'BeginReviewController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/beginReview/beginReview.html',
        controllerAs: 'vm'
      })
      .state('swipeTinder', {
        url: '/:subject/:edition/swipeTinder',
        params: {
          param1: null,
          color: null
        },
        controller: 'SwipeTinderController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/swipeTinder/swipeTinder.html',
        controllerAs: 'vm'
      })


      .state('checks.detail', {
        url: '/checksDetail/:checkId',
        controller: function($scope, $stateParams){
            $scope.idCheck = $stateParams.checkId;
        },
        templateUrl: 'components/checksDetail/checksDetail.html'
      })


      .state('randomAssignment', {
        url: '/randomAssignment',
        controller: 'RandomAssignmentController',
        templateUrl: 'components/randomAssignment/randomAssignment.html',
        controllerAs: 'vm'
      })
      .state('waiting', {
        url: '/:subject/:edition/waiting',
        controller: 'WaitingController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/waiting/waiting.html',
        controllerAs: 'vm'
      })
      .state('confirmMyResult', {
        url: '/:subject/:edition/confirmMyResult',
        controller: 'ConfirmMyResultController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/confirmMyResult/confirmMyResult.html',
        controllerAs: 'vm'
      })
      .state('expectingConfirmation', {
        url: '/expectingConfirmation',
        controller: 'ExpectingConfirmationController',
        templateUrl: 'components/expectingConfirmation/expectingConfirmation.html',
        controllerAs: 'vm'
      })
      .state('chooseReviewed', {
        url: '/chooseReviewed',
        controller: 'ChooseReviewedController',
        templateUrl: 'components/chooseReviewed/chooseReviewed.html',
        controllerAs: 'vm'
      })
      .state('checks', {
        url: '/checks',
        controller: 'ChecksController',
        templateUrl: 'components/checks/checks.html',
        controllerAs: 'vm'
      })
      .state('checksV2', {
        url: '/checksV2',
        controller: 'ChecksV2Controller',
        templateUrl: 'components/checksV2/checksV2.html',
        controllerAs: 'vm'
      })
      .state('improveCheckV2', {
        url: '/improveCheckV2',
        controller: 'ImproveCheckV2Controller',
        templateUrl: 'components/improveCheckV2/improveCheckV2.html',
        controllerAs: 'vm'
      })
      .state('resume', {
        url: '/:subject/:edition/resume',
        controller: 'ResumeController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/resume/resume.html',
        controllerAs: 'vm'
      })
      .state('improveCheck', {
        url: '/:subject/:edition/improveCheck',
        controller: 'ImproveCheckController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/improveCheck/improveCheck.html',
        controllerAs: 'vm'
      })
      .state('ganttChart', {
        url: '/devel/roadmap/milestone1',
        controller: 'GanttChartController',
        templateUrl: 'components/ganttChart/ganttChart.html',
        controllerAs: 'vm'
      })
      .state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'components/admin/admin.html',
        controllerAs: 'vm'
      })
      .state('teacher', {
        url: '/teacher',
        controller: 'TeacherController',
        templateUrl: 'components/teacher/teacher.html',
        controllerAs: 'vm'
      })
      .state('subjects', {
        url: '/subjects/:subject/',
        controller: 'SubjectsController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject; 
        },
        templateUrl: 'components/subjects/subjects.html',
        controllerAs: 'vm'
      })
      .state('feedbacks', {
        url: '/feedbacks/:subject/',
        controller: 'FeedbacksController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject; 
        },
        templateUrl: 'components/feedbacks/feedbacks.html',
        controllerAs: 'vm'
      })
      .state('feedbacksInformation', {
        url: '/feedbacks/:subject/:edition/information/:idFeedback',
        controller: 'FeedbacksInformationController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject; 
            $scope.edition = $stateParams.edition; 
            $scope.idFeedback = $stateParams.idFeedback; 
        },
        templateUrl: 'components/feedbacksInformation/feedbacksInformation.html',
        controllerAs: 'vm'
      })
      .state('feedbacksResults', {
        url: '/feedbacks/:subject/:edition/results/:idFeedback',
        controller: 'FeedbacksResultsController', function($scope, $stateParams) {
            $scope.subject = $stateParams.subject; 
            $scope.edition = $stateParams.edition; 
            $scope.idFeedback = $stateParams.idFeedback; 
        },
        templateUrl: 'components/feedbacksResults/feedbacksResults.html',
        controllerAs: 'vm'
      })
      .state('crosscheck', {
        url: '/feedbacks/:subject/:edition/crosscheck/:idFeedback',
        controller: 'CrosscheckController', function($scope, $stateParams) {
            $scope.subject = $stateParams.subject; 
            $scope.edition = $stateParams.edition; 
            $scope.idFeedback = $stateParams.idFeedback; 
        },
        templateUrl: 'components/crosscheck/crosscheck.html',
        controllerAs: 'vm'
      })
      .state('crosscheckStudent', {
        url: '/feedbacks/:subject/:edition/crosscheck/:idFeedback/:student',
        controller: 'CrosscheckStudentController', function($scope, $stateParams) {
            $scope.subject = $stateParams.subject; 
            $scope.edition = $stateParams.edition; 
            $scope.idFeedback = $stateParams.idFeedback; 
            $scope.student = $stateParams.student; 
        },
        templateUrl: 'components/crosscheckStudent/crosscheckStudent.html',
        controllerAs: 'vm'
      })
      .state('swipe', {
        url: '/swipe',
        controller: 'demoSwipeCtrl',
        templateUrl: 'components/swipe/swipe.html',
        controllerAs: 'vm'
      })
      .state('checksSwipe', {
        url: '/checksSwipe',
        controller: 'ChecksSwipeController',
        templateUrl: 'components/checksSwipe/checksSwipe.html',
        controllerAs: 'vm'
      })
      .state('crosscheckSelectFeedback', {
        url: '/crosscheckSelectFeedback',
        controller: 'CrosscheckSelectFeedbackController',
        templateUrl: 'components/crosscheckSelectFeedback/crosscheckSelectFeedback.html',
        controllerAs: 'vm'
      })
      .state('crosscheckSelectStudent', {
        url: '/crosscheckSelectStudent',
        controller: 'CrosscheckSelectStudentController',
        templateUrl: 'components/crosscheckSelectStudent/crosscheckSelectStudent.html',
        controllerAs: 'vm'
      })
      .state('newFeedbackInformation', {
        url: '/newFeedbackInformation',
        controller: 'NewFeedbackInformationController',
        templateUrl: 'components/newFeedbackInformation/newFeedbackInformation.html',
        controllerAs: 'vm'
      })
      .state('feedbacksResultsRecords', {
        url: '/feedbacksResultsRecords',
        controller: 'FeedbacksResultsRecordsController',
        templateUrl: 'components/feedbacksResultsRecords/feedbacksResultsRecords.html',
        controllerAs: 'vm'
      })
      .state('feedbacksResultsRecordsStudents', {
        url: '/feedbacksResultsRecordsStudents',
        controller: 'FeedbacksResultsRecordsStudentsController',
        templateUrl: 'components/feedbacksResultsRecordsStudents/feedbacksResultsRecordsStudents.html',
        controllerAs: 'vm'
      })
      .state('feedbacksResultsRecordsStudentChosen', {
        url: '/feedbacksResultsRecordsStudentChosen',
        controller: 'FeedbacksResultsRecordsStudentChosenController',
        templateUrl: 'components/feedbacksResultsRecordsStudentChosen/feedbacksResultsRecordsStudentChosen.html',
        controllerAs: 'vm'
      })
      .state('bye', {
        url: '/:subject/:edition/bye',
        controller: 'ByeController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/bye/bye.html',
        controllerAs: 'vm'
      })
      .state('finish', {
        url: '/:subject/:edition/finish',
        controller: 'FinishController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/finish/finish.html',
        controllerAs: 'vm'
      })
      .state('waitingConfirmation', {
        url: '/:subject/:edition/waitingConfirmation',
        controller: 'WaitingConfirmationController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/waitingConfirmation/waitingConfirmation.html',
        controllerAs: 'vm'
      })
      .state('resultsConfirmed', {
        url: '/:subject/:edition/resultsConfirmed',
        controller: 'ResultsConfirmedController', function($scope, $stateParams) {
            // get the id
            $scope.subject = $stateParams.subject;

            // get the location
            $scope.edition = $stateParams.edition;   
        },
        templateUrl: 'components/resultsConfirmed/resultsConfirmed.html',
        controllerAs: 'vm'
      })
      .state('validacion', {
        url: '/validacion',
        controller: 'ValidacionController',
        templateUrl: 'components/validacion/validacion.html',
        controllerAs: 'vm'
      });


    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        additionalSignUpFields: [
        {
          name: "full_name",
          placeholder: "Enter your full name"
        }],

        _idTokenVerification: false,
        languageDictionary: {
          title: "Feedbacks SOS 16-17"
        },
        theme: {
          logo: '/images/logous.png',
          primaryColor: "#9d2235"
        }
      }
    });

    $urlRouterProvider.otherwise('/home');

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('id_token');
      }],
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

  }

})();
