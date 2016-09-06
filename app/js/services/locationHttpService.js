var app = angular.module('app')

app.service(
  "LocationHttp",
  function($http) {

    return({

      counties: function() {
        return $http.get('location/counties', {
          ignoreLoadingBar: false
        })
      }, // end of counties function

      county: function(id) {
        return $http.get('location/municipalities/' + id, {
          ignoreLoadingBar: false
        })
      }, // end of county function

      municipality: function(id) {
        return $http.get('location/municipality/' + id, {
          ignoreLoadingBar: false
        })
      }, // end of municipality function

      // used in county child controller
      countyMatch: function(id) {
        return $http.get('location/match/county/' + id, {
          ignoreLoadingBar: false
        })
      },

      // used in municipality child controller
      municipalityMatch: function(id) {
        return $http.get('location/match/municipality/' + id, {
          ignoreLoadingBar: false
        })
      }
    }) // end of return


  } // end of service function
)
