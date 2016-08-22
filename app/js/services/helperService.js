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

      }
    })

  }
)
