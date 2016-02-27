angular
  .module('app')

    // Controller for search results
    .controller('searchResultsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      function($scope, $http, $rootScope) {

      $rootScope.header = 'Sökning - IT Jobben'
      $scope.searchTerm = sessionStorage.getItem("searchTerm");

      // fetch current pagination page. Defaults to 1 if pagination sessionStorage isn't set yet
      if (sessionStorage.getItem("paginationSearch") === null) {
        $scope.pagination = '1';
      } else {
        $scope.paginationPage = sessionStorage.getItem("paginationSearch");
      }

      // set empty array to fill up with ads matching above 75%
      var adsAbove75 = [];

      $http.get('http://localhost:1339/api/search/' + sessionStorage.getItem("searchTerm"), {
        ignoreLoadingBar: false,
      })
      .then(function(response) {
        console.log(response);
        $scope.ads = response.data.matchningslista.matchningdata;
        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].relevans == 100) {
            adsAbove75.push($scope.ads[i]);
          }
        }

        $scope.ads75 = adsAbove75;
      }); // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        $scope.paginationPage = newPageNumber;
        // set sessionStorage
        sessionStorage.setItem("paginationSearch", newPageNumber);
        $scope.paginationPage = sessionStorage.getItem("paginationSearch");
      };



      // function to search again
      $scope.search = function () {

        // reset results array
        adsAbove75 = [];

        // reset pagination page to Defaults
        $scope.paginationPage = '1';

        // set searchterm
        sessionStorage.setItem("searchTerm", $scope.searchterm);
        $scope.searchTerm = sessionStorage.getItem("searchTerm");


        // do http req with new search term
        $http.get('http://localhost:1339/api/search/' + sessionStorage.getItem("searchTerm"), {
          ignoreLoadingBar: false,
        })
        .then(function(response) {
          console.log(response);
          $scope.ads = response.data.matchningslista.matchningdata;
          // loop through ads to get 100% matches
          for (i = 0; i < $scope.ads.length; i++) {
            if ($scope.ads[i].relevans == 100) {
              adsAbove75.push($scope.ads[i]);
            }
          }

          $scope.ads75 = adsAbove75;
        });

      };


    }]); // end of controller
