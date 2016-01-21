'use strict';

angular
  .module('app', [
    'ui.router'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/index.html'
      })

      .state('singleAd', {
        url: '/annonsid/2819163',
        templateUrl: 'templates/singleAd.html'
      })

      .state('test', {
        url:'/test',
        templateUrl: 'templates/test.html'
      })




  }]);
