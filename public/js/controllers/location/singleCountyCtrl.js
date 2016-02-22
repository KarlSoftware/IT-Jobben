angular
  .module('app')

    // Controller to get all municipalities in a municipality
    .controller('municipalitiesCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      'LocationState',
      'BreadcrumbState',
      function($scope, $http, $stateParams, LocationState, BreadcrumbState) {

      // Create variable from param
      var countyID = $stateParams.countyID;


      // fetch current location
      $scope.currentCounty = sessionStorage.getItem("countyName");

      // fetch current breadcrumb state for active countyID
      $scope.currentCountyBreadcrumb = sessionStorage.getItem("countyBread");

      $http.get('http://localhost:1339/location/municipalities/' + countyID, {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        $scope.municipalities = response.data.body.soklista.sokdata;
        console.log(response);
        // $scope.workgroup = response.data.body.soklista.sokdata;
      })

      // set locationState and breadcrumb state upon clicking a municipality
      $scope.setLocation = function(location, breadcrumb) {
        // set factory states
        LocationState.setMunicipality(location);
        BreadcrumbState.setMunicipalityBreadcrumb(breadcrumb)

        // set sessionStorage
        sessionStorage.setItem("municipalityName", location);
        sessionStorage.setItem("municipalityBread", breadcrumb);
      }

    }])

    // Child Controller to get number of ads in a municipality
    .controller('municipalityChildCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      $http.get('http://localhost:1339/location/match/municipality/' + $scope.municipality.id +'', {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        $scope.adsInMunicipality = response.data.body.matchningslista.antal_platsannonser_exakta;
        if ($scope.adsInMunicipality == 1) {
          $scope.ads = '1 annons';
        } else {
          $scope.ads = $scope.adsInMunicipality + ' annonser';
        }
      })

    }])
