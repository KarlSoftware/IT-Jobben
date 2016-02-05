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
        url: '/annons/:adID',
        templateUrl: 'templates/singleAd/singleAd.html'
      })

      .state('searchresults', {
        url: '/searchresults',
        templateUrl: 'templates/search/searchResults.html'
      })

      .state('workgroups', {
        url: '/yrkesgrupper',
        templateUrl: 'templates/workgroup/workGroups.html'
      })

      .state('workgroupsID', {
        templateUrl: 'templates/workgroup/workGroupID.html'
        url: '/yrkesgrupper/:workgroupID',
        templateUrl: 'templates/workgroup/singleWorkgroup.html'
      })

      .state('yrkeDetail', {
        url: '/yrke/:professionID',
        templateUrl: 'templates/workgroup/professionDetails.html'
      })

      .state('counties', {
        url: '/lan',
        templateUrl: 'templates/location/counties.html'
      })

      .state('municipalities', {
        templateUrl: 'templates/location/municipalities.html'
        url: '/lan/:countyID',
      })

      .state('municipalityAds', {
        templateUrl: 'templates/location/municipalityAds.html'
        url: '/kommun/:municipalityID/ads',
      })


  }]);
