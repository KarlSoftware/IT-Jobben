angular
  .module('app')

    // Controller to view all counties
    .controller('footerCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

        $scope.date = new Date();
    }]);
