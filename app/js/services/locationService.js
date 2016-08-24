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
      } // end of municipality function

    }) // end of return


  } // end of service function
)
