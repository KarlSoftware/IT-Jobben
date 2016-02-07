angular
  .module('app')

    // Controller for viewing single ad
    .controller('singleAdCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      // Create variable from param
      var ad = $stateParams.adID;

      // array for random image class to use with jumbotron image
      var randomImage = [
        'code1',
        'code2',
        'code3',
        'code4',
        'code5'
      ]
      // get a random item from image array and assign to scope variables
      $scope.randomImgClass = randomImage[Math.floor(Math.random()*randomImage.length)];
      console.log($scope.randomImgClass);

      $http.get('http://localhost:1339/api/singleAd/' + ad + '', {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        console.log(response);
        // attach response to scope variables
        $scope.adDetails =      response;
        $scope.annons =         response.data.body.platsannons.annons;
        $scope.ansokan =        response.data.body.platsannons.ansokan;
        $scope.arbetsplats =    response.data.body.platsannons.arbetsplats;
        $scope.krav =           response.data.body.platsannons.krav;
        $scope.villkor =        response.data.body.platsannons.villkor;
        console.log($scope.adDetails);
      })

    }])
