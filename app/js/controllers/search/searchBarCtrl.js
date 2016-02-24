angular
  .module('app')

    // Controller for search bar
    .controller('searchBarCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      '$location',
      function($scope, $http, $stateParams, $location) {

        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path().substring(0, 5);
        };


        $scope.doSearch = function () {
          // set sessionStorage
          sessionStorage.setItem("searchTerm", $scope.searchterm);
          sessionStorage.setItem("paginationSearch", '1');
        };

    }]);
