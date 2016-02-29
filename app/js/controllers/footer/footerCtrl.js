angular
  .module('app')

    // Controller for footer
    .controller('footerCtrl', [
      '$scope',
      '$http',
      function($scope, $http) {

        // get current date to use in copyright context
        $scope.date = new Date();
    }]);
