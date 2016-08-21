angular
  .module('app')

    // Controller for about
    .controller('profileCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      'Auth',
      'User',
      function($scope, $http, $rootScope, Auth, User) {

        $scope.now = moment().format();

        // set page header title
        $rootScope.header = 'Min profil - IT Jobben';

        // get authData from current user as an object
        var currentUser = JSON.parse(localStorage.getItem('firebase:session::it-jobben'));
        $scope.user = currentUser.facebook.cachedUserProfile;

        // get all saved ads
        $scope.savedAds = User.getSavedAdsArray(currentUser.facebook.id);

        $scope.removeAd = function(object) {
          console.log($scope.user.id);
          console.log(object.id);

          User.deleteAd($scope.user.id, object.id);
        }

    }]);
