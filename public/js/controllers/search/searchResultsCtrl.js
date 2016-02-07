angular
  .module('app')

    // Controller for search bar results
    .controller('searchResultsCtrl', [
      '$scope',
      '$http',
      'Data',
      'LocationState',
      'Pagination',
      function($scope, $http, Data, LocationState, Pagination) {

        console.log('searchResultCtrl working');
        console.log('Jag är searchResultCtrl. Data.searchterm är nu:' + Data.getSearchTerm());
        $scope.searchTerm = Data.getSearchTerm();

        $scope.pagination = Pagination.getNew(50);

        $http.get('http://localhost:1339/api/search/' + Data.getSearchTerm())
        .then(function(response) {
          console.log(response);
          $scope.searchResults = response.data.body.matchningslista.antal_platsannonser;
          $scope.ads = response.data.body.matchningslista.matchningdata;
          $scope.pagination.numPages = Math.ceil($scope.ads.length/$scope.pagination.perPage);
          // $scope.data = $scope.ads.slice(0, 10); // set initial length of search results to display
        })




        // infinite scroll function to load more results
        // $scope.loadMore = function() {
        //   $scope.data = $scope.ads.slice(0, $scope.data.length + 10);
        // }

        // function to search again
        $scope.search = function () {
          // set searchterm
          Data.setSearchTerm($scope.searchterm);
          console.log('search term factory är nu', Data.getSearchTerm());
          $scope.searchTerm = Data.getSearchTerm();

          // do http req with new search term
          $http.get('http://localhost:1339/api/search/' + Data.getSearchTerm())
          .then(function(response) {
            console.log(response);
            $scope.searchResults = response.data.body.matchningslista.antal_platsannonser;
            $scope.ads = response.data.body.matchningslista.matchningdata;
            $scope.pagination.numPages = Math.ceil($scope.ads.length/$scope.pagination.perPage);
          })

        }


    }]) // end of controller
