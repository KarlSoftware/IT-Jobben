angular
  .module('app')

    // Controller for about
    .controller('aboutCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      function($scope, $http, $rootScope) {

        // set page header title
        $rootScope.header = 'Om - IT Jobben';

        // variable for previous URL
        $scope.previousURL = sessionStorage.getItem('previousURL');



    }]);
