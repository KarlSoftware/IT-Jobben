angular
  .module('app')

    // Controller to get all municipalities in a municipality
    .controller('municipalitiesCtrl', ['$scope', '$http', '$stateParams', 'LocationState', 'BreadcrumbState', function($scope, $http, $stateParams, LocationState, BreadcrumbState) {

      // Create variable from param
      var countyID = $stateParams.countyID;


      // fetch current location
      $scope.currentCounty = LocationState.getCounty();

      // fetch current breadcrumb state for active countyID
      $scope.currentCountyBreadcrumb = BreadcrumbState.getCountyBreadcrumb();

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
      }

    }])

    // Child Controller to get number of ads in a municipality
    .controller('municipalityChildCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      $http.get('http://localhost:1339/location/match/municipality/' + $scope.municipality.id +'', {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        $scope.adsInMunicipality = response.data.body.matchningslista.antal_platsannonser_exakta;
      })

    }])
