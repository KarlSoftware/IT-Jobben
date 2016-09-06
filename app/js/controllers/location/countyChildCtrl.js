angular
  .module('app')

  // Child Controller to get number of ads in a county
  .controller('countyChildCtrl', [
    '$scope',
    '$http',
    'LocationHttp',
    function($scope, $http, LocationHttp) {

      // make http request
      LocationHttp.countyMatch($scope.county.id)
        .then(function(response) {
          $scope.adsInCounty = response.data.body.matchningslista.antal_platsannonser_exakta;
        });

  }]);
