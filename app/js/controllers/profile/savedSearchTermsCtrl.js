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
        var currentUser = JSON.parse(localStorage.getItem('firebase:session::it-jobben'));
        $scope.user = currentUser.facebook.cachedUserProfile;

        $scope.searchTerms = User.getSavedSearchTerms(currentUser.facebook.id);

        // select a searchterm
        // used to pass the search term to session storage
        $scope.select = function(term) {
          sessionStorage.setItem("searchTerm", term);
        }

        // delete a single saved search term
        $scope.remove = function($event, $id) {
          $event.preventDefault();
          console.log('removing id', $id);
          User.deleteSearchTerm(currentUser.facebook.id, $id);

        }

    }]);
