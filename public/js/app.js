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
        url: '/annonsid/:adID',
        templateUrl: 'templates/singleAd/singleAd.html'
      })

      .state('searchresults', {
        url: '/searchresults',
        templateUrl: 'templates/search/searchResults.html'
      })

      .state('workgroups', {
        url: '/workgroups',
        templateUrl: 'templates/workgroup/workGroups.html'
      })

      .state('workgroupsID', {
        url: '/workgroups/:workgroupID',
        templateUrl: 'templates/workgroup/workGroupID.html'
      })

      .state('yrkeDetail', {
        url: '/profession/:professionID',
        templateUrl: 'templates/workgroup/professionDetails.html'
      })



  }]);
