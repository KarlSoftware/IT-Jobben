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
        var searchTerm = sessionStorage.searchTerm;

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



    }]); // end of controller
