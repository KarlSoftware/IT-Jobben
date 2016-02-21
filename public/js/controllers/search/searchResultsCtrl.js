angular
  .module('app')

    // Controller for search bar results
    .controller('searchResultsCtrl', [
      '$scope',
      '$http',
      'Data',
      'LocationState',
      function($scope, $http, Data, LocationState) {

      console.log('Jag är searchResultCtrl. Data.searchterm är nu:' + Data.getSearchTerm());
      $scope.searchTerm = Data.getSearchTerm();

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

        $scope.ads75 = adsAbove75
      })



      // function to search again
      $scope.search = function () {
        // set empty array to fill up with ads matching above 75%
        adsAbove75 = []
        // set searchterm
        Data.setSearchTerm($scope.searchterm);
        console.log('search term factory är nu', Data.getSearchTerm());
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
