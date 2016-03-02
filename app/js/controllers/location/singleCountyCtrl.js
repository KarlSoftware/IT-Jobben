angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('municipalitiesCtrl', [
      '$scope',
      '$http',
      '$routeParams',
      '$rootScope',
      function($scope, $http, $routeParams, $rootScope) {

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

      $http.get('location/municipalities/' + countyID, {
        ignoreLoadingBar: true
      })
      .then(function(response) {
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

    // Child Controller to get number of ads in a municipality
    .controller('municipalityChildCtrl', ['$scope', '$http', function($scope, $http) {

      $http.get('location/match/municipality/' + $scope.municipality.id +'', {
        ignoreLoadingBar: false
      })
      .then(function(response) {
        $scope.adsInMunicipality = response.data.body.matchningslista.antal_platsannonser_exakta;
        if ($scope.adsInMunicipality == 1) {
          $scope.ads = '1 annons';
        } else {
          $scope.ads = $scope.adsInMunicipality + ' annonser';
        }
      });

    }]);
