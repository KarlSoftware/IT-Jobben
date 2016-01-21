angular
  .module('app')

    .controller('searchResultsCtrl', ['$scope', '$http', 'Data', function($scope, $http, Data) {

      console.log('searchResultCtrl working');
      console.log('Jag är searchResultCtrl. Data.searchterm är nu:' + Data.getSearchTerm());
      $scope.searchTerm = Data.getSearchTerm();

      $http.get('http://localhost:1339/api/search/' + Data.getSearchTerm())
      .then(function(data) {
        $scope.result = data;
      })

    }]) // end of controller
