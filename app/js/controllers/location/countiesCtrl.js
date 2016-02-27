angular
  .module('app')

    // Controller to view all counties
    .controller('countiesCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      '$rootScope',
      function($scope, $http, $stateParams, $rootScope) {

        // set page title
        $rootScope.header = 'Län - IT Jobben';

        $http.get('http://localhost:1339/location/counties', {
          ignoreLoadingBar: true
        })
        .then(function(response) {
          $scope.counties = response.data.body.soklista.sokdata;
          console.log(response);
        });

        // set locationState upon clicking a county
        $scope.setLocation = function(location, breadcrumb) {
          console.log('du klickade på', location);
          // set sessionStorage
          sessionStorage.setItem("countyName", location);
          sessionStorage.setItem("countyBread", breadcrumb);
        };
    }])

    // Child Controller to get number of ads in a county
    .controller('countyChildCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

        $http.get('http://localhost:1339/location/match/county/' + $scope.county.id +'', {
          ignoreLoadingBar: false
        })
        .then(function(response) {
          $scope.adsInCounty = response.data.body.matchningslista.antal_platsannonser_exakta;
          if ($scope.adsInCounty == 1) {
            $scope.ads = '1 annons';
          } else {
            $scope.ads = $scope.adsInCounty + ' annonser';
          }
        });

    }]);
