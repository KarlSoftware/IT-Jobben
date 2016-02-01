'use strict';

angular
  .module('app', [
    'ui.router',
    'angularMoment'
  ])

  // change Moment language
  .run(function(amMoment) {
    amMoment.changeLocale('sv');
  })

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

      .state('counties', {
        url: '/counties',
        templateUrl: 'templates/location/counties.html'
      })

      .state('municipalities', {
        url: '/municipalities/:countyID',
        templateUrl: 'templates/location/municipalities.html'
      })



  }]);
