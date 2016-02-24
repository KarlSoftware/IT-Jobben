angular
  .module('app')

    // Controller for search bar
    .controller('searchBarCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {


      $scope.doSearch = function () {
        // set sessionStorage
        sessionStorage.setItem("searchTerm", $scope.searchterm);
        sessionStorage.setItem("paginationSearch", '1');
      };

    }]);
