angular
  .module('app')

    // Controller for footer
    .controller('footerCtrl', [
      '$scope',
      '$http',
      '$location',
      function($scope, $http, $location) {

        // get current date to use in copyright text
        $scope.date = new Date();

        // function to save current $location.path in sessionStorage. For usage later on about route
        $scope.setURL = function() {
          sessionStorage.setItem('previousURL', $location.path());
        }
    }]);
