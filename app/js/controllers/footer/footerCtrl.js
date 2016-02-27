angular
  .module('app')

    // Controller for footer
    .controller('footerCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

        // get current date to use in copyright context
        $scope.date = new Date();
    }]);
