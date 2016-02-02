angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('municipalityAdsCtrl', ['$scope', '$http', '$stateParams', 'LocationState', function($scope, $http, $stateParams, LocationState) {

      // Create variable from param
      var municipalityID = $stateParams.municipalityID;


      // fetch current location
      $scope.currentLocation = LocationState.getLocation();

      $http.get('http://localhost:1339/location/municipality/' + municipalityID)
      .then(function(response) {
        $scope.howManyAds = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.howManyAdsNear = response.data.body.matchningslista.antal_platsannonser_narliggande;
        console.log($scope.howManyAdsNear);
        $scope.ads = response.data.body.matchningslista.matchningdata;
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
