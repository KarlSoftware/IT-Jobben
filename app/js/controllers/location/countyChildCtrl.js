angular
  .module('app')

  // Child Controller to get number of ads in a county
  .controller('countyChildCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {

      $http.get('location/match/county/' + $scope.county.id +'', {
        ignoreLoadingBar: false
      })
      .then(function(response) {
        $scope.adsInCounty = response.data.body.matchningslista.antal_platsannonser_exakta;
      });

  }]);
