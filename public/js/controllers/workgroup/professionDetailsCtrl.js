angular
  .module('app')

    // Controller to view imdb id
    .controller('professionDetailsCtrl', ['$scope', '$http', '$stateParams', 'WorkGroupState', 'LocationState', function($scope, $http, $stateParams, WorkGroupState, LocationState) {

      // Create variable from param
      var id = $stateParams.professionID;

      // fetch current profession
      $scope.currentProfession = WorkGroupState.getSetWorkgroup();

      $http.get('http://localhost:1339/api/profession/' + id)
      .then(function(response) {
        $scope.result = response;
        $scope.ads = response.data.body.matchningslista.matchningdata;
        console.log(response);
      })

      // set locationState upon clicking a county
      $scope.setLocation = function(location) {
        console.log('du klickade på', location);
        LocationState.setLocation(location);
        console.log("Location är nu:" + location);
      }

    }])
