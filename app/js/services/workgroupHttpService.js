var app = angular.module('app')

app.service(
  "WorkgroupHttp",
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
      } // end of insideProfession function

    }) // end of return


  } // end of service function
)
