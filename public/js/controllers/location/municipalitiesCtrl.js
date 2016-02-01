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

      // // change current state of workgroup
      // $scope.setProfession = function(yrke) {
      //   console.log('du klickade på', yrke);
      //   WorkGroupState.setWorkgroup(yrke);
      //   console.log("Workgroupstate är nu:" + yrke);
      // }

    }])
