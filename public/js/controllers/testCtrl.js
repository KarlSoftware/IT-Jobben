angular
  .module('app')

    // Controller id
    .controller('testCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      // Create variable from param
      // var ad = $stateParams.singleAd;
      // var ad = 2819163;
      $scope.test = 'test';
      console.log('controller working')

      $http.get('http://localhost:1339/api/test')
      .then(function(data) {
        $scope.adDetails = data;
      })



    }])
