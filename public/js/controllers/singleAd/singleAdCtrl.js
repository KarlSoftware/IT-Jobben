angular
  .module('app')

    // Controller for viewing single ad
    .controller('singleAdCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      // Create variable from param
      var ad = $stateParams.adID;


      $http.get('http://localhost:1339/api/singleAd/' + ad + '')
      .then(function(response) {
        console.log(response);
        $scope.adDetails =      response;
        $scope.annons =         response.data.body.platsannons.annons;
        $scope.ansokan =        response.data.body.platsannons.ansokan;
        $scope.arbetsplats =    response.data.body.platsannons.arbetsplats;
        $scope.krav =           response.data.body.platsannons.krav;
        $scope.villkor =        response.data.body.platsannons.villkor;
        console.log($scope.adDetails);
      })

    }])
