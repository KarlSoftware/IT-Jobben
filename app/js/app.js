/*
* jQuery code to properly collapse the navbar
*/
$(document).on('click','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
      $(this).collapse('hide');
  }
});

angular
  .module('app', [
    'angularMoment',
    'angular-loading-bar',
    'tc.chartjs',
    'angularUtils.directives.dirPagination',
    'ngRoute',
    'firebase',
    'duScroll'
  ])
  .value('duScrollOffset', 30) // offset the scroll values a bit 

  // change Moment language
  .run(function(amMoment, $rootScope, $location) {
    amMoment.changeLocale('sv');

    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
     if (error === "AUTH_REQUIRED") {
       $location.path("/");
     }
    });

  })

  .config([
    'cfpLoadingBarProvider',
    '$routeProvider',
    '$locationProvider',
    function(cfpLoadingBarProvider, $routeProvider, $locationProvider) {

    // $urlRouterProvider.otherwise('/');
    cfpLoadingBarProvider.includeSpinner = false; // config for loading bar spinner.


    $routeProvider
      .when('/', {
        templateUrl: 'templates/index.html'
      })
      .when('/login', {
        templateUrl: 'templates/login/login.html',
        controller: 'loginCtrl'
      })
      // about page
      .when('/om', {
        templateUrl: 'templates/about.html'
      })
      // single ad
      .when('/annons/:adID', {
        templateUrl: 'templates/singleAd/singleAd.html'
      })
      // search results
      .when('/sökning', {
        templateUrl: 'templates/search/searchResults.html'
      })
      // workgroups
      .when('/yrken', {
        templateUrl: 'templates/workgroup/workGroups.html',
        reloadOnSearch: false

      })
      // workgroups
      .when('/yrkesgrupper/:workgroupID', {
        templateUrl: 'templates/workgroup/singleWorkgroup.html'
      })
      // workgroups
      .when('/yrke/:professionID', {
        templateUrl: 'templates/workgroup/professionDetails.html'
      })
      // places. Län, kommuner
      .when('/plats/', {
        templateUrl: 'templates/location/counties.html',
        reloadOnSearch: false

      })
      // places. Län, kommuner
      .when('/plats/lan/:countyID', {
        templateUrl: 'templates/location/singleCounty.html'
      })
      // places. Län, kommuner
      .when('/plats/kommun/:municipalityID/annonser', {
        templateUrl: 'templates/location/adsInMunicipality.html'
      })
      // statistics
      .when('/statistik', {
        templateUrl: 'templates/statistics/workgroupsStats.html'
      })
      // statistics
      .when( '/statistik/yrkesgrupp/:id', {
        templateUrl: 'templates/statistics/singleWorkgroupStats.html'
      })
      // statistics
      .when('/statistik/yrke/:id', {
        templateUrl: 'templates/statistics/professionStatsDetails.html'
      })
      // profil
      .when('/profil', {
        templateUrl: 'templates/profile/profile.html',
        controller: 'profileCtrl',
        resolve: {
             "currentAuth": ["Auth", function(Auth) {
               return Auth.$requireAuth();
             }]
        }
      })

      // all other routes return home page
      .otherwise({
        redirectTo: '/'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);


  }]);
