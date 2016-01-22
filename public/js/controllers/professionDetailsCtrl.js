angular
  .module('app')

    // Controller to view imdb id
    .controller('professionDetailsCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      // Create variable from param
      var id = $stateParams.professionID;

      $http.get('http://localhost:1339/api/profession/' + id)
      .then(function(response) {
        $scope.result = response;
        $scope.ads = response.data.body.matchningslista.matchningdata;
      })

    }])
