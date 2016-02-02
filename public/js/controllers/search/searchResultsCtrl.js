angular
  .module('app')

    // Controller for search bar results
    .controller('searchResultsCtrl', ['$scope', '$http', 'Data', function($scope, $http, Data) {

      console.log('searchResultCtrl working');
      console.log('Jag är searchResultCtrl. Data.searchterm är nu:' + Data.getSearchTerm());
      $scope.searchTerm = Data.getSearchTerm();

      $http.get('http://localhost:1339/api/search/' + Data.getSearchTerm())
      .then(function(response) {
        $scope.searchResults = response.data.body.matchningslista.antal_platsannonser;
        $scope.ads = response.data.body.matchningslista.matchningdata;
      })

    }]) // end of controller
