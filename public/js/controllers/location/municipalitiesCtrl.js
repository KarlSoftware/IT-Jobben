angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('municipalitiesCtrl', ['$scope', '$http', '$stateParams', 'LocationState', function($scope, $http, $stateParams, LocationState) {

      // Create variable from param
      var countyID = $stateParams.countyID;


      // fetch current location
      $scope.currentLocation = LocationState.getLocation();

      $http.get('http://localhost:1339/location/municipalities/' + countyID)
      .then(function(response) {
        $scope.municipalities = response.data.body.soklista.sokdata;
        console.log(response);
        // $scope.workgroup = response.data.body.soklista.sokdata;
      })

      // set locationState upon clicking a county
      $scope.setLocation = function(location) {
        console.log('du klickade på', location);
        LocationState.setLocation(location);
        console.log("Location är nu:" + location);
      }

    }])

    // Child Controller to get number of ads in a municipality
    .controller('municipalityChildCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      $http.get('http://localhost:1339/location/match/municipality/' + $scope.municipality.id +'')
      .then(function(response) {
        $scope.adsInMunicipality = response.data.body.matchningslista.antal_platsannonser_exakta;
      })

    }])
