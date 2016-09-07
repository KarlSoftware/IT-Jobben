angular
  .module('app')

    // Controller for about
    .controller('savedAdsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      'Auth',
      'User',
      'Helper',
      function($scope, $http, $rootScope, Auth, User, Helper) {


        $scope.now = moment().format();
        $scope.sevenDaysFromNow  = Helper.sevenDaysFromNow();



        // set page header title
        $rootScope.header = 'Min profil - IT Jobben';

        // get authData from current user as an object
        var currentUser = User.UserObject();
        $scope.user = currentUser.facebook.cachedUserProfile;

        // get all saved ads
        $scope.savedAds = User.getSavedAdsArray(currentUser.facebook.id);

        /*
        * Funtion to open modal for deleting
        *
        * @param object The ad object in question to delete
        * @param $event Use event to prevent normal link behaviour
        */
        $scope.openModal = function(object, $event) {
          // since the delete button is wrapped inside a link for ads not yet expired
          // a preventDefault function is needed to prevent normal link behaviour
          // when clicking the delete button
          $event.preventDefault();
          // create scope object from the passed ad object
          $scope.adToDelete = object;

        }

        /*
        * delete function inside modal
        */
        $scope.delete = function() {
          console.log('deleting object', $scope.adToDelete);
          // call function that deletes the ad
          User.deleteAd($scope.user.id, $scope.adToDelete.id);
        }



    }]);
