(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'ngStorage'])
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
      .state('resume', {
        url: '/resume',
        controller: 'ResumeController',
        templateUrl: 'components/resume/resume.html',
        controllerAs: 'vm'
      })
      .state('finish', {
        url: '/finish',
        controller: 'FinishController',
        templateUrl: 'components/finish/finish.html',
        controllerAs: 'vm'
      })
      .state('improveCheck', {
        url: '/improveCheck',
        controller: 'ImproveCheckController',
        templateUrl: 'components/improveCheck/improveCheck.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        _idTokenVerification: false
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
