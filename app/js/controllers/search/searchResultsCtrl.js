angular
  .module('app')

    // Controller for search results
    .controller('searchResultsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      '$location',
      function($scope, $http, $rootScope, $location) {

        var searchTerm = $location.search().term;

        /* Function to perform http request and fetch search results
        *
        * @param {String} searchFor The string to search for
        */
        function search(searchFor) {

          var relevantAds = []; // empty array to be used later in iteration

          // do http request
          $http.get('api/search/' + searchFor, {
            ignoreLoadingBar: false,
          })
          .then(function(response) {
            $scope.ads = response.data.matchningslista.matchningdata;
            // loop through ads
            for (i = 0; i < $scope.ads.length; i++) {
              // only push 100% matching ads to relevantAds array
              if ($scope.ads[i].relevans == 100) {
                relevantAds.push($scope.ads[i]);
              }
            }
            // attach relevant ads to scope
            $scope.ads75 = relevantAds;
          }); // end of then

        } // end of search function



        // set page header
        $rootScope.header = 'Sökning - IT Jobben';

        // attach searchTerm to scope
        $scope.searchTerm = sessionStorage.getItem("searchTerm");

        // fetch current pagination page. Defaults to 1 if pagination sessionStorage isn't set yet
        if (sessionStorage.getItem("paginationSearch") === null) {
          $scope.pagination = '1';
        } else {
          $scope.paginationPage = sessionStorage.getItem("paginationSearch");
        }

        console.log(searchTerm);
        /*
        * Call the search function with sessionStorage as param
        */
        search(searchTerm);

        // dir-pagination-controls function to change current pagination page
        $scope.changePagination = function(newPageNumber, oldPageNumber) {
          $scope.paginationPage = newPageNumber;
          // set sessionStorage
          sessionStorage.setItem("paginationSearch", newPageNumber);
          $scope.paginationPage = sessionStorage.getItem("paginationSearch");
        };



        // function to search again
        $scope.search = function () {

          $location.search({term: $scope.searchterm});

          // reset pagination page to Defaults
          $scope.paginationPage = '1';
          // set searchterm
          sessionStorage.setItem("searchTerm", $scope.searchterm);
          // attach searchterm to scope
          $scope.searchTerm = sessionStorage.getItem("searchTerm");

          /*
          * Call the search function with sessionStorage as param
          */
          search($scope.searchterm);
        };


    }]); // end of controller
