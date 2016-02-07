angular
  .module('app')

    // Controller for search bar
    .controller('searchBarCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      'Data',
      function($scope, $http, $stateParams, Data) {

      console.log('searchBarCtrl');

      $scope.doSearch = function () {
        console.log('söker efter', $scope.searchterm);
        Data.setSearchTerm($scope.searchterm);
        console.log('Data.searchterm är nu:' + Data.getSearchTerm());
      }

    }])
