var app = angular.module('app')

app.service(
  "Job",
  function($http) {

    return({

      workgroup: function() {
        return $http.get('api/yrkesgrupper', {
          ignoreLoadingBar: false
        })
      }, // end of workgroup function

      insideWorkgroup: function(workgroup) {
        return $http.get('api/yrkesgrupp/' + workgroup, {
          ignoreLoadingBar: false
        })
      }, // end of insideWorkgroup function

      insideProfession: function(profession) {
        return $http.get('api/yrke/' + profession, {
          ignoreLoadingBar: false
        })
      }, // end of insideProfession function

      determineDate: function(recentDate, professionID) {
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
      }
    }) // end of return


  } // end of service function
)
