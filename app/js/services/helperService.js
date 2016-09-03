var app = angular.module('app')

app.service(
  "Helper",
  function($http) {

    return({
      /*
      * function to return a formated date seven days from the current date
      * returns the future date
      */
      sevenDaysFromNow: function() {

        var sevenDaysFromNow  = moment().add('days', 7);

        return sevenDaysFromNow.format();

      },

      // set the most recent ad date as localstorage for that profession
      determineDateProfession: function(recentDate, professionID) {

        // if localStorage already exist
        if (localStorage['itjobben-date-profession' + professionID]) {
          console.log('localStorage for date does exists...');
          // update localStorage with the most recent ad date
          localStorage['itjobben-date-profession' + professionID] = recentDate;
        } else {
          console.log('localstorage for date doesnt not exist!');
          // update localStorage with the most recent ad date
          localStorage['itjobben-date-profession' + professionID] = recentDate;
        }

      },

      // set the most recent ad date as localstorage for that profession
      determineDateMunicipality: function(recentDate, municipalityID) {

        // if localStorage already exist
        if (localStorage['itjobben-date-municipality' + municipalityID]) {
          console.log('localStorage for date does exists...');
          // update localStorage with the most recent ad date
          localStorage['itjobben-date-municipality' + municipalityID] = recentDate;
        } else {
          console.log('localstorage for date doesnt not exist!');
          // update localStorage with the most recent ad date
          localStorage['itjobben-date-municipality' + municipalityID] = recentDate;
        }

      }
    })

  }
)
