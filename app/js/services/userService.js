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

        },




        /*
        * Return Saved ads as a firebase array
        * @param id the user ID
        */
        getSavedAdsArray: function(id) {
          var adsRef = new Firebase('https://it-jobben.firebaseio.com/users/' + id + '/saved-ads');
          return $firebaseArray(adsRef);
        },


        /*
        * Return saved search terms as a firebase array
        * @param id the user ID
        */
        getSavedSearchTerms: function(id) {
          var searchRef = new Firebase('https://it-jobben.firebaseio.com/users/' + id + '/saved-search');
          return $firebaseArray(searchRef);
        },





        /*
        * Save an ad to firebase
        * @param userID the user id in question
        * @param ad Object to extract information from and save to firebase
        */
        saveAd: function(userID, ad) {


          var usersURL = 'https://it-jobben.firebaseio.com/users/';

          var adRef = new Firebase(
            usersURL + userID + '/saved-ads/' + ad.annons.annonsid
          );

          adRef.set({
            id: ad.annons.annonsid,
            rubrik: ad.annons.annonsrubrik,
            kommun: ad.annons.kommunnamn,
            kommunkod: ad.annons.kommunkod,
            yrke: ad.annons.yrkesbenamning,
            yrkesid: ad.annons.yrkesid,
            arbetsplats: ad.arbetsplats.arbetsplatsnamn,
            sista_ansokningsdag: ad.ansokan.sista_ansokningsdag
          });

        },





        /*
        * Delete an ad from firebase
        * @param userID the user id in question
        * @param adID the ad ID in question to delete
        */
        deleteAd: function(userID, adID) {

          var usersURL = 'https://it-jobben.firebaseio.com/users/';

          var adRef = new Firebase(
            usersURL + userID + '/saved-ads/' + adID
          );

          adRef.remove();
        },





        /*
        * Determine if ad is saved or not in firebase
        */
        checkAdSaved: function(userID, adID) {

          var adRef = new Firebase(
            'https://it-jobben.firebaseio.com/users/' + userID + '/saved-ads/' + adID
          );

          return adRef.once('value', function(snapshot) {
          });
        },




        /*
        * Return a reference snapshot about an saved searchterm
        * to determine if the term is saved or not
        */
        checkSavedSearchTerm: function(userID, searchTerm) {

          var saved = '';
          var searchRef = new Firebase(
            'https://it-jobben.firebaseio.com/users/' + userID + '/saved-search'
          );

          return searchRef.once('value', function(snapshot) {
          });

        },





        /*
        * Save search term to firebase
        */
        saveSearchTerm: function(userID, searchTerm) {

          var usersURL = 'https://it-jobben.firebaseio.com/users/';

          var searchRef = new Firebase(
            usersURL + userID + '/saved-search/'
          );

          searchRef.push({
            searchterm: searchTerm
          });

        },

        /*
        * Delete a search term
        */
        deleteSearchTerm: function(userID, searchTermID) {
          var usersURL = 'https://it-jobben.firebaseio.com/users/';

          var searchRef = new Firebase(
            usersURL + userID + '/saved-search/' + searchTermID
          );

          searchRef.remove();
        }

      })

  })
