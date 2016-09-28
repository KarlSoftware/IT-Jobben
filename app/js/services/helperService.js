var app = angular.module('app')

app.service(
  "Helper",
  function($http) {

    return({

      /* function to return a random item from array
      * used to inject a random image class for viewing single ads
      */
      randomImage: function() {
        // array containing class names for different images
        var imgArray = [
          'code1',
          'code2',
          'code3',
          'code4',
          'code5'
        ];

        return imgArray[Math.floor(Math.random()*imgArray.length)];
      },

      /*
      * function to return a formated date seven days from the current date
      * returns the future date
      */
      sevenDaysFromNow: function() {

        var sevenDaysFromNow = moment().add('days', 7);

        return sevenDaysFromNow.format();

      },


      /*
      * function to return a formated date for yesterdays date
      * returns the formated date
      */
      yesterdayDate: function() {

        var yesterday = moment().subtract(1, 'days');

        return yesterday.format();
      },



      // set the most recent ad date as localstorage for that profession
      /*
      * set the most recent ad date as localStorage for that profession
      * @param recentDate Date the date to set to localStorage
      * @param professionID String The profession id in the context
      */
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



      /*
      * set the most recent ad date as localStorage for that municipality
      * @param recentDate Date the date to set to localStorage
      * @param municipalityID String The municipality id in the context
      */
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
