angular
  .module('app')

    // Controller for about
    .controller('profileCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      'Auth',
      function($scope, $http, $rootScope, Auth) {

        // set page header title
        $rootScope.header = 'Profil - IT Jobben';

        Auth.$onAuth(function(authData) {

            $scope.user = authData.facebook.cachedUserProfile;
            console.log($scope.user);

        })

    }]);
