angular
  .module('app')

    // Controller for search bar
    .controller('searchBarCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      '$location',
      '$route',
      function($scope, $http, $stateParams, $location, $route) {

        console.log($route.current.$$route.originalPath);

        // scope function to set active route. Used to assign active class to navbar links
        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path().substring(0, 5);
        };

        $scope.doSearch = function () {
          // set sessionStorage
          sessionStorage.setItem("searchTerm", $scope.navbarSearchTerm);
          console.log($scope.navbarSearchTerm)
          sessionStorage.setItem("paginationSearch", '1');

          // go to searchresults page if not already there
          if ($route.current.$$route.originalPath != '/sökning') {
            console.log('du är inte på sökning');
            $location.path('sökning'); // change $route
          }

          // reload view if current $route is searchResults
          if ($route.current.$$route.originalPath == '/sökning') {
            console.log('du är på sökning');
            $route.reload(); // reload $route
          }

        };



    }]);
