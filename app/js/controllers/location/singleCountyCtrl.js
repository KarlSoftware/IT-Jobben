angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('singleCountyCtrl', [
      '$scope',
      '$http',
      '$routeParams',
      '$rootScope',
      'LocationHttp',
      function($scope, $http, $routeParams, $rootScope, LocationHttp) {

      // set page title
      $rootScope.header = sessionStorage.getItem("countyName") + ' - IT Jobben';
      // Create variable from param
      var countyID = $routeParams.countyID;

      // fetch current location
      $scope.currentCounty = sessionStorage.getItem("countyName");

      // fetch current breadcrumb state for active countyID
      $scope.currentCountyBreadcrumb = sessionStorage.getItem("countyBread");

      // set pagination too 1
      sessionStorage.setItem("paginationMunicipality", '1');

      // make http request
      LocationHttp.county(countyID).then(function(response) {
        $scope.municipalities = response.data.body.soklista.sokdata;
        console.log(response);
      });

      // set locationState and breadcrumb state upon clicking a municipality
      $scope.setLocation = function(location, breadcrumb) {
        // set sessionStorage
        sessionStorage.setItem("municipalityName", location);
        sessionStorage.setItem("municipalityBread", breadcrumb);
      };

    }])
