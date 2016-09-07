angular
  .module('app')

    // Controller for about
    .controller('savedSearchTermsCtrl', [
      '$scope',
      '$http',
      'Auth',
      'User',
      'Helper',
      function($scope, $http, Auth, User, Helper) {

        // get authData from current user as an object
        var currentUser = User.UserObject();
        $scope.user = currentUser.facebook.cachedUserProfile;

        $scope.searchTerms = User.getSavedSearchTerms(currentUser.facebook.id);

        // select a searchterm
        // used to pass the search term to session storage
        $scope.select = function(term) {
          sessionStorage.setItem("searchTerm", term);
        }

        // function for when user clicks delete icon and a modal opens
        $scope.openModal = function($event, searchterm) {
          $scope.searchterm = {
            'name': searchterm.searchterm,
            'id': searchterm.$id
          };
          $event.preventDefault();
        }

        // function that triggers from inside the modal, deletes search term
        $scope.delete = function() {
          User.deleteSearchTerm(currentUser.facebook.id, $scope.searchterm.id);
        }

    }]);
