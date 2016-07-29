angular
  .module('app')

    // Controller for search bar
    .controller('searchBarCtrl', [
      '$scope',
      '$http',
      '$location',
      '$route',
      '$firebaseAuth',
      'Auth',
      function($scope, $http, $location, $route, $firebaseAuth, Auth) {

        Auth.$onAuth(function(authData) {
          if (authData) {
            $scope.user = true;
          }
        })

        // scope function to set active route. Used to assign active class to navbar links
        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path().substring(0, 5);
        };

        $scope.doSearch = function () {

          $location.search({term: $scope.navbarSearchTerm});
          // set sessionStorage
          sessionStorage.setItem("searchTerm", $scope.navbarSearchTerm);
          console.log($scope.navbarSearchTerm)
          sessionStorage.setItem("paginationSearch", '1');

          // go to searchresults page if not already there
          if ($route.current.$$route.originalPath != '/sökning') {
            $location.path('sökning'); // change $route
          }

          // reload view if current $route is searchResults
          if ($route.current.$$route.originalPath == '/sökning') {
            $route.reload(); // reload $route
          }

        };

        // login the user
        $scope.login = function() {
          console.log('loggar in');
          var ref = new Firebase("https://it-jobben.firebaseio.com/");
          // create an instance of the authentication service
          var auth = $firebaseAuth(ref);
          // login with Facebook
          auth.$authWithOAuthPopup("facebook").then(function(authData) {
            console.log("Logged in as:", authData.uid);
          }).catch(function(error) {
            console.log("Authentication failed:", error);
          });
        }

        // Log out the user
        $scope.logout = function() {
          console.log('loggar ut');
          $scope.authObj = Auth;
          $scope.authObj.$unauth();
          $location.path('/');
        }



    }]);
