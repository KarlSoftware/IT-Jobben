angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('municipalityAdsCtrl', ['$scope', '$http', '$stateParams', 'LocationState', 'BreadcrumbState', function($scope, $http, $stateParams, LocationState, BreadcrumbState) {

      // Create variable from param
      var municipalityID = $stateParams.municipalityID;


      // fetch current municipality name and county name
      $scope.currentMunicipality = LocationState.getMunicipality();
      $scope.currentCounty = LocationState.getCounty();

      // fetch current municipality and county breadcrumbs
      $scope.currentMunicipalityBreadcrumb = BreadcrumbState.getMunicipalityBreadcrumb();
      $scope.currentCountyBreadcrumb = BreadcrumbState.getCountyBreadcrumb();

      // make http req
      $http.get('http://localhost:1339/location/municipality/' + municipalityID)
      .then(function(response) {
        $scope.howManyAds = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.howManyAdsNear = response.data.body.matchningslista.antal_platsannonser_narliggande;
        console.log($scope.howManyAdsNear);
        $scope.ads = response.data.body.matchningslista.matchningdata;
        $scope.data = $scope.ads.slice(0, 10);
        console.log(response);
        // $scope.workgroup = response.data.body.soklista.sokdata;
      })

      // infinite scroll function to load more results
      $scope.loadMore = function() {
        $scope.data = $scope.ads.slice(0, $scope.data.length + 10); // set result
      }



    }])
