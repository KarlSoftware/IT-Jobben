'use strict';

angular
  .module('app', [
    'ui.router',
    'angularMoment',
    'angular-loading-bar',
    'infinite-scroll',
    'googlechart',
    'chart.js',
    'tc.chartjs'
  ])

  // change Moment language
  .run(function(amMoment) {
    amMoment.changeLocale('sv');
  })

  .config([
    '$urlRouterProvider',
    '$stateProvider',
    'cfpLoadingBarProvider',
    function($urlRouterProvider, $stateProvider, cfpLoadingBarProvider) {
    $urlRouterProvider.otherwise('/');
    cfpLoadingBarProvider.includeSpinner = false; // config for loading bar spinner.


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

      .state('singleWorkgroup', {
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

      .state('singleCounty', {
        url: '/lan/:countyID',
        templateUrl: 'templates/location/singleCounty.html'
      })

      .state('municipalityAds', {
        url: '/kommun/:municipalityID/ads',
        templateUrl: 'templates/location/adsInMunicipality.html'
      })

      .state('statistics', {
        url: '/statistik',
        templateUrl: 'templates/statistics/statistics.html'
      })


  }]);
