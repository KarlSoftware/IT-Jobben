angular
  .module('app')

    // Controller for about
    .controller('aboutCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      '$rootScope',
      function($scope, $http, $stateParams, $rootScope) {

        // set page title
        $rootScope.header = 'Om - IT Jobben';

    }]);
