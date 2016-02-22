angular
  .module('app')

    // Controller for search bar
    .controller('searchBarCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      'Data',
      function($scope, $http, $stateParams, Data) {


      $scope.doSearch = function () {
        console.log('söker efter', $scope.searchterm);
        Data.setSearchTerm($scope.searchterm);
        // set sessionStorage
        sessionStorage.setItem("searchTerm", $scope.searchterm);
        sessionStorage.setItem("pagination", '1');
      }

    }])
