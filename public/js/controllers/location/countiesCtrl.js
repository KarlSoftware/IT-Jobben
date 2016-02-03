angular
  .module('app')

    // Controller to view all counties
    .controller('countiesCtrl', ['$scope', '$http', '$stateParams', 'LocationState', function($scope, $http, $stateParams, LocationState) {



      $http.get('http://localhost:1339/location/counties')
      .then(function(response) {
        $scope.counties = response.data.body.soklista.sokdata;
        console.log(response);
      })

      // set locationState upon clicking a county
      $scope.setLocation = function(location) {
        console.log('du klickade på', location);
        LocationState.setCounty(location);
        console.log("Location är nu:" + location);
      }

    }])

    // Child Controller to get number of ads in a county
    .controller('countyChildCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      $http.get('http://localhost:1339/location/match/county/' + $scope.county.id +'')
      .then(function(response) {
        $scope.adsInCounty = response.data.body.matchningslista.antal_platsannonser_exakta;
      })

    }])
