angular
  .module('app')

    // Controller to view all counties
    .controller('countiesCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      'LocationHttp',
      function($scope, $http, $rootScope, LocationHttp) {

        // set page title
        $rootScope.header = 'Län - IT Jobben';

        LocationHttp.counties().then(function(response) {
          $scope.counties = response.data.body.soklista.sokdata;
        });

        // set locationState upon clicking a county
        $scope.setLocation = function(location, breadcrumb) {
          console.log('du klickade på', location);
          // set sessionStorage
          sessionStorage.setItem("countyName", location);
          sessionStorage.setItem("countyBread", breadcrumb);
        };
    }])
