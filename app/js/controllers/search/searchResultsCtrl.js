angular
  .module('app')

    // Controller for search results
    .controller('searchResultsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      '$location',
      'Search',
      'User',
      'Auth',
      function($scope, $http, $rootScope, $location, Search, User, Auth) {

        // get searchterm from sessionStorage
        var searchTerm = sessionStorage.searchTerm;

        // determine if user is authenticated
        Auth.$onAuth(function(authData) {
          if (authData) {
            $scope.auth = true;
            // call user factory that returns a promise
            User.checkSavedSearchTerm(authData.facebook.id, searchTerm)
            .then(function(snapshot) {
              // loop through each children (each saved searchterm)
              snapshot.forEach(function(child) {
                // if the searchterm the user is searching for
                //matches the saved search term
                if (child.val().searchterm == searchTerm) {
                  $scope.savedSearchTermID = child.key();
                  console.log(child.key());
                  $scope.saved = true;
                  return true; // stop the loop

                } else {
                  // else set it to a hack bool value
                  $scope.saved = false;

                }
                // force scope to re-apply itself
                $scope.$apply()
              })
            }) // end of promise
          } // end of if authdata is found
        });

        $location.search({term: searchTerm});


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

        // create user variable from firebase session if it exist
        if (localStorage.getItem('firebase:session::it-jobben')) {
          var currentUser = JSON.parse(localStorage.getItem('firebase:session::it-jobben'));
        }

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

        // save searchterm to firebase db
        $scope.saveSearch = function(searchTerm) {
          User.saveSearchTerm(currentUser.facebook.id, searchTerm);
          $scope.saved = searchTerm;

        }

        // delete searchterm from db
        $scope.deleteSearch = function(searchTerm) {
          User.deleteSearchTerm(currentUser.facebook.id, $scope.savedSearchTermID);
          $scope.saved = false;
        }




    }]); // end of controller
