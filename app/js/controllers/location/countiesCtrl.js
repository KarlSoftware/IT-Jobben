angular
  .module('app')

    // Controller to view all counties
    .controller('countiesCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      '$location',
      function($scope, $http, $rootScope, $location) {

        $scope.step2 = false;
        $scope.step3 = false;

        // set page title
        $rootScope.header = 'Län - IT Jobben';

        $http.get('location/counties', {
          ignoreLoadingBar: true
        })
        .then(function(response) {
          $scope.counties = response.data.body.soklista.sokdata;
          console.log(response);
        });

        // set locationState upon clicking a county
        $scope.selectCounty = function(location, id) {
          console.log('du klickade på', location);

          $scope.currentCounty = location;

          $location.search({län: id});

          $scope.paginationPage = 1;


          $scope.step2 = true;
          $scope.step3 = false;

          $http.get('location/municipalities/' + $location.search().län, {
            ignoreLoadingBar: false
          })
          .then(function(response) {
            $scope.municipalities = response.data.body.soklista.sokdata;
          });

        };

        $scope.selectMunicipality = function(location, muniID) {

          // get current country id from query params
          var currentCounty = $location.search().län;

          // step3 is now visible
          $scope.step3 = true;
          // get current muni name
          $scope.municipality = location;
          // set new query params
          $location.search({län: currentCounty, kommun: muniID, sida: "1"});


          $http.get('location/municipality/' + muniID)
          .then(function(response) {
            $scope.ads = response.data;
          })

          // set pagination from query params
          $scope.paginationPage = "1";

        }

        // dir-pagination-controls function to change current pagination page
        $scope.changePagination = function(newPageNumber, oldPageNumber) {

          $scope.paginationPage = newPageNumber;
          $location.search({län: $location.search().län, kommun: $location.search().kommun, sida: newPageNumber});
        };
    }])

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
