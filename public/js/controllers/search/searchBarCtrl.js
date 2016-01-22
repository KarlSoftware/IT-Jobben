angular
  .module('app')

    // Controller to view imdb id
    .controller('searchBarCtrl', ['$scope', '$http', '$stateParams', 'Data', function($scope, $http, $stateParams, Data) {

      console.log('searchBarCtrl');

      $scope.doSearch = function () {
        console.log('söker efter', $scope.searchterm);
        Data.setSearchTerm($scope.searchterm);
        console.log('Data.searchterm är nu:' + Data.getSearchTerm());
      }

    }])
