angular
  .module('app')

  // Child Controller to get number of ads in a municipality
  .controller('municipalityChildCtrl', [
    '$scope',
    '$http',
    'LocationHttp',
    function($scope, $http, LocationHttp) {

      // make http request
      LocationHttp.municipalityMatch($scope.municipality.id)
        .then(function(response) {
          $scope.adsInMunicipality = response.data.body.matchningslista.antal_platsannonser_exakta;
          if ($scope.adsInMunicipality == 1) {
            $scope.ads = '1 annons';
          } else {
            $scope.ads = $scope.adsInMunicipality + ' annonser';
          }
        });

  }]);
