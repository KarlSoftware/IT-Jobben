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

        /*
        * Funtion to remove ads from firebase
        *
        * @param object The ad object in question to delete
        * @param $event Use event to prevent normal link behaviour
        */
        $scope.removeAd = function(object, $event) {
          // since the delete button is wrapped inside a link for ads not yet expired
          // a preventDefault function is needed to prevent normal link behaviour
          // when clicking the delete button
          $event.preventDefault();

          // call function that deletes the ad
          User.deleteAd($scope.user.id, object.id);
        }



    }]);
