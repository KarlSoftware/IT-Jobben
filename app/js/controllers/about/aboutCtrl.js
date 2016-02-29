angular
  .module('app')

    // Controller for about
    .controller('aboutCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      function($scope, $http, $rootScope) {

        // set page title
        $rootScope.header = 'Om - IT Jobben';

    }]);
