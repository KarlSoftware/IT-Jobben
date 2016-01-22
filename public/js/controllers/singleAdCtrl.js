angular
  .module('app')

    // Controller to view imdb id
    .controller('singleAdCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      // Create variable from param
      var ad = $stateParams.adID;


      $http.get('http://localhost:1339/api/singleAd/' + ad + '')
      .then(function(data) {
        $scope.adDetails = data;
      })

    }])
