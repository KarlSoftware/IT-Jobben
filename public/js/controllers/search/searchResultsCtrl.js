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


        $http.get('http://localhost:1339/api/search/' + Data.getSearchTerm())
        .then(function(response) {
          console.log(response);
          $scope.searchResults = response.data.body.matchningslista.antal_platsannonser;
          $scope.ads = response.data.body.matchningslista.matchningdata;
        })


        // function to search again
        $scope.search = function () {
          // set searchterm
          Data.setSearchTerm($scope.searchterm);
          $scope.searchTerm = Data.getSearchTerm();

          // do http req with new search term
          $http.get('http://localhost:1339/api/search/' + Data.getSearchTerm())
          .then(function(response) {
            console.log(response);
            $scope.searchResults = response.data.body.matchningslista.antal_platsannonser;
            $scope.ads = response.data.body.matchningslista.matchningdata;
          })

        }


    }]) // end of controller
