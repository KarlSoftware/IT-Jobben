angular
  .module('app')

    // Controller for search results
    .controller('searchResultsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      '$location',
      'Search',
      function($scope, $http, $rootScope, $location, Search) {


        // get searchterm from query param
        var searchTerm = $location.search().term;

        // call search service and attach respose to scope
        Search.searchFor(searchTerm).then(function(response) {
          $scope.ads75 = response.data;
        })

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


        // dir-pagination-controls function to change current pagination page
        $scope.changePagination = function(newPageNumber, oldPageNumber) {
          $scope.paginationPage = newPageNumber;
          // set sessionStorage
          sessionStorage.setItem("paginationSearch", newPageNumber);
          $scope.paginationPage = sessionStorage.getItem("paginationSearch");
        };



        // function to search again
        // on searchresult view search field
        $scope.search = function () {

          $location.search({term: $scope.searchterm});

          // reset pagination page to Defaults
          $scope.paginationPage = '1';
          // set searchterm
          sessionStorage.setItem("searchTerm", $scope.searchterm);
          // attach searchterm to scope
          $scope.searchTerm = sessionStorage.getItem("searchTerm");

          // call search service and attach response to scope
          Search.searchFor($scope.searchterm).then(function(response) {
            $scope.ads75 = response.data;
          })


        };


    }]); // end of controller
