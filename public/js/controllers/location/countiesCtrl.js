angular
  .module('app')

    // Controller to view imdb id
    .controller('countiesCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {



      $http.get('http://localhost:1339/location/counties')
      .then(function(response) {
        $scope.counties = response.data.body.soklista.sokdata;
        console.log(response)
      })

    }])
