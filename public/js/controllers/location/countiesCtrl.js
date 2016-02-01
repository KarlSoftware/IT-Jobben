angular
  .module('app')

    // Controller to view all counties
    .controller('countiesCtrl', ['$scope', '$http', '$stateParams', 'LocationState', function($scope, $http, $stateParams, LocationState) {



      $http.get('http://localhost:1339/location/counties')
      .then(function(response) {
        $scope.counties = response.data.body.soklista.sokdata;
        console.log(response)
      })

      // set locationState upon clicking a county
      $scope.setLocation = function(location) {
        console.log('du klickade på', location);
        LocationState.setLocation(location);
        console.log("Location är nu:" + location);
      }

    }])
