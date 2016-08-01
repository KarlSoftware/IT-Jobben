var app = angular.module('app')

app.service(
  "Search",
  function($http) {

    return({
      searchFor: function(term) {

        // make request to search with the query param
        return $http.get('search/search/' + term, {
          ignoreLoadingBar: false,
        })

      }
    })

  }
)
