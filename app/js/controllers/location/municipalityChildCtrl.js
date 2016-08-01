angular
  .module('app')

  // Child Controller to get number of ads in a municipality
  .controller('municipalityChildCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('location/match/municipality/' + $scope.municipality.id +'', {
      ignoreLoadingBar: false
    })
    .then(function(response) {
      $scope.adsInMunicipality = response.data.body.matchningslista.antal_platsannonser_exakta;
      if ($scope.adsInMunicipality == 1) {
        $scope.ads = '1 annons';
      } else {
        $scope.ads = $scope.adsInMunicipality + ' annonser';
      }
    });

  }]);
