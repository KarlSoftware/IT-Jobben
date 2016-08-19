angular
  .module('app')

    // Controller for footer
    .controller('loginCtrl', [
      '$scope',
      '$firebaseAuth',
      'Auth',
      '$window',
      '$rootScope',
      '$location',
      'User',
      function($scope, $firebaseAuth, Auth, $window, $rootScope, $location, User) {


      // set page header
      $rootScope.header = 'Logga in - IT Jobben';


      // login the user
      $scope.login = function() {
        console.log('loggar in');
        var ref = new Firebase("https://it-jobben.firebaseio.com/");
        // create an instance of the authentication service
        var auth = $firebaseAuth(ref);
        // login with Facebook
        auth.$authWithOAuthPopup("facebook").then(function(authData) {

          // check if user is new or not
          // create user if user is new with User service
          User.checkNewUser(authData, authData.facebook.id);

          $location.path('/profil');
        }).catch(function(error) {
          console.log("Authentication failed:", error);
        });
      }
    }]);
