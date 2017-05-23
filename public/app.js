(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'ngStorage', 'ngMaterial'])
    .config(config);

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'jwtOptionsProvider'];

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider) {

    $stateProvider
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
      .state('studentInformation', {
        url: '/studentInformation',
        controller: 'StudenInformationController',
        templateUrl: 'components/studentInformation/studentInformation.html',
        controllerAs: 'vm'
      })
      .state('preparation', {
        url: '/preparation',
        controller: 'PreparationController',
        templateUrl: 'components/preparation/preparation.html',
        controllerAs: 'vm'
      })
      .state('randomAssignment', {
        url: '/randomAssignment',
        controller: 'RandomAssignmentController',
        templateUrl: 'components/randomAssignment/randomAssignment.html',
        controllerAs: 'vm'
      })
      .state('waiting', {
        url: '/waiting',
        controller: 'WaitingController',
        templateUrl: 'components/waiting/waiting.html',
        controllerAs: 'vm'
      })
      .state('confirmMyResult', {
        url: '/confirmMyResult',
        controller: 'ConfirmMyResultController',
        templateUrl: 'components/confirmMyResult/confirmMyResult.html',
        controllerAs: 'vm'
      })
      .state('beginSecondReview', {
        url: '/beginSecondReview',
        controller: 'BeginSecondReviewController',
        templateUrl: 'components/beginSecondReview/beginSecondReview.html',
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
        url: '/resume',
        controller: 'ResumeController',
        templateUrl: 'components/resume/resume.html',
        controllerAs: 'vm'
      })
      
      .state('improveCheck', {
        url: '/improveCheck',
        controller: 'ImproveCheckController',
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
      .state('swipe', {
        url: '/swipe',
        controller: 'demoSwipeCtrl',
        templateUrl: 'components/swipe/swipe.html',
        controllerAs: 'vm'
      })
      .state('swipeTinder', {
        url: '/swipeTinder',
        controller: 'SwipeTinderController',
        templateUrl: 'components/swipeTinder/swipeTinder.html',
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
      .state('crosscheck', {
        url: '/crosscheck',
        controller: 'CrosscheckController',
        templateUrl: 'components/crosscheck/crosscheck.html',
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
        url: '/bye',
        controller: 'ByeController',
        templateUrl: 'components/bye/bye.html',
        controllerAs: 'vm'
      }).state('finish', {
        url: '/finish',
        controller: 'FinishController',
        templateUrl: 'components/finish/finish.html',
        controllerAs: 'vm'
      });


    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
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
