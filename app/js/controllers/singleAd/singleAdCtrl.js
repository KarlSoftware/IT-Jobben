angular
  .module('app')
    // Controller for viewing single ad
    .controller('singleAdCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var ad = $stateParams.adID;

      // array for random image class to use with jumbotron image
      var randomImage = [
        'code1',
        'code2',
        'code3',
        'code4',
        'code5'
      ];

      // get a random item from image array and assign to scope variables
      $scope.randomImgClass = randomImage[Math.floor(Math.random()*randomImage.length)];

      $http.get('http://localhost:1339/api/singleAd/' + ad + '', {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        console.log(response);
        // attach response to scope variables
        $scope.adDetails = response;
        $scope.annons = response.data.body.platsannons.annons;
        $scope.ansokan = response.data.body.platsannons.ansokan;
        $scope.arbetsplats = response.data.body.platsannons.arbetsplats;
        $scope.krav = response.data.body.platsannons.krav;
        $scope.driverslicenseList = response.data.body.platsannons.krav.korkortslista;
        $scope.villkor = response.data.body.platsannons.villkor;

        // do logic depending on what the response contains
        // logic for sista ansökningsdag
        if ($scope.ansokan.sista_ansokningsdag) {
          if ($scope.ansokan.sista_ansokningsdag === '') {
            $scope.sista_ansokningsdag = 'ingen info';
          } else {
            $scope.sista_ansokningsdag = moment($scope.ansokan.sista_ansokningsdag).format("dddd, Do MMMM, h:mm");
          }
        } else {
          $scope.sista_ansokningsdag = 'ingen info';
        }

        // logic for referens
        if ($scope.ansokan.referens) {
          if ($scope.ansokan.referens === '') {
            $scope.referens = 'ingen info';
          } else {
            $scope.referens = $scope.ansokan.referens;
          }
        } else {
          $scope.referens = 'ingen info';
        }

        // logic for email
        if ($scope.ansokan.epostadress) {
          if ($scope.ansokan.epostadress === '') {
            $scope.epost = 'ingen info';
          } else {
            $scope.epost = $scope.ansokan.epostadress;
          }
        } else {
          $scope.epost = 'ingen info';
        }

        // logic for egenbil
        if ($scope.krav.egenbil) {
            $scope.bil = 'Annonsen kräver egen bil';
          } else {
            $scope.bil = 'Inget krav om egen bil';
          }

      }); // end of http then

    }]);
