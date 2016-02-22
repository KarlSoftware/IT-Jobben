angular
  .module('app')

    // Controller for search bar results
    .controller('searchResultsCtrl', [
      '$scope',
      '$http',
      'Data',
      'LocationState',
      'PaginationState',
      function($scope, $http, Data, LocationState, PaginationState) {

      $scope.searchTerm = Data.getSearchTerm();

      // fetch current pagination page. Defaults to 1
      if (PaginationState.getPagination() == 0) {
        $scope.paginationPage = 1;
      } else {
        $scope.paginationPage = PaginationState.getPagination();
      }

      // set empty array to fill up with ads matching above 75%
      adsAbove75 = []

      $http.get('http://localhost:1339/api/search/' + Data.getSearchTerm())
      .then(function(response) {
        console.log(response);
        $scope.ads = response.data.body.matchningslista.matchningdata;
        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].relevans == 100) {
            console.log('relevans som är 100')
            adsAbove75.push($scope.ads[i]);
          }
        }

        $scope.ads75 = adsAbove75;
      }) // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        PaginationState.setPagination(newPageNumber);
        $scope.paginationPage = newPageNumber;
      }



      // function to search again
      $scope.search = function () {

        // set empty array to fill up with ads matching above 75%
        adsAbove75 = []

        // reset pagination page to Defaults
        $scope.paginationPage = 1;

        // set searchterm
        Data.setSearchTerm($scope.searchterm);
        $scope.searchTerm = Data.getSearchTerm();


        // do http req with new search term
        $http.get('http://localhost:1339/api/search/' + Data.getSearchTerm())
        .then(function(response) {
          console.log(response);
          $scope.ads = response.data.body.matchningslista.matchningdata;
          // loop through ads to get 100% matches
          for (i = 0; i < $scope.ads.length; i++) {
            if ($scope.ads[i].relevans == 100) {
              console.log('relevans som är 100')
              adsAbove75.push($scope.ads[i]);
            }
          }

          $scope.ads75 = adsAbove75
        })

      }


    }]) // end of controller
