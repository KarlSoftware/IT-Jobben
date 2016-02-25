angular
  .module('app')

    // Controller for search bar
    .controller('searchBarCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      '$location',
      '$state',
      function($scope, $http, $stateParams, $location, $state) {

        // scope function to set active state. Used to assign active class to navbar links
        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path().substring(0, 5);
        };

        $scope.doSearch = function () {
          // set sessionStorage
          sessionStorage.setItem("searchTerm", $scope.navbarSearchTerm);
          console.log($scope.navbarSearchTerm)
          sessionStorage.setItem("paginationSearch", '1');

          // go to searchresults page if not already there
          if ($state.current.name != 'searchresults') {
            $state.go('searchresults'); // change $state
          }

          // reload view if current $state is searchResults
          if ($state.current.name == 'searchresults') {
            $state.reload(); // reload $state
          }

        };



    }]);
