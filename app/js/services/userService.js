var app = angular.module('app')
  .factory('User',
    function($firebaseArray) {

      return({

        /*
        * Check if user exist in firebase or not
        * If not: create new user with that authData
        *
        * @param authData The user data to save to firebase
        * @param id The unique ID of the user
        */
        checkNewUser: function(authData, id) {

          // create new instance of the current user
          var currentUser = new Firebase('https://it-jobben.firebaseio.com/users/' + id);

          // shorter referense to user info to be used when setting up new user
          var profile = authData.facebook.cachedUserProfile;

          // take snapshot of current user
          currentUser.once('value', function(snapshot) {

            var exist = snapshot.exists();

            // if user does not exist yet
            if (exist == false) {

              // create the current user
              currentUser.set({
                profile: {
                  firstName: profile.first_name,
                  lastName: profile.last_name
                }
              })
            } // end of if statement
          }) // end of snapshot

        }
      })

  })
