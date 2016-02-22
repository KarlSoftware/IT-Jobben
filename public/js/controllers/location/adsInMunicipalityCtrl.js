angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('municipalityAdsCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      'LocationState',
      'BreadcrumbState',
      'PaginationState',
      function($scope, $http, $stateParams, LocationState, BreadcrumbState, PaginationState) {

      // Create variable from param
      var municipalityID = $stateParams.municipalityID;

      // fetch current municipality name and county name
      $scope.currentMunicipality = LocationState.getMunicipality();
      $scope.currentCounty = LocationState.getCounty();

      // fetch current municipality and county breadcrumbs
      $scope.currentMunicipalityBreadcrumb = BreadcrumbState.getMunicipalityBreadcrumb();
      $scope.currentCountyBreadcrumb = BreadcrumbState.getCountyBreadcrumb();

      // fetch current pagination page. Defaults to 1
      if (PaginationState.getPagination() == 0) {
        $scope.paginationPage = 1;
      } else {
        $scope.paginationPage = PaginationState.getPagination();
      }

      // set empty array to fill up with 100% matching ads
      adsArrayExact = []

      // make http req
      $http.get('http://localhost:1339/location/municipality/' + municipalityID)
      .then(function(response) {
        $scope.howManyAds = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.howManyAdsNear = response.data.body.matchningslista.antal_platsannonser_narliggande;
        $scope.ads = response.data.body.matchningslista.matchningdata;
        console.log(response);
        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].relevans == 100) {
            adsArrayExact.push($scope.ads[i]);
          }
        }

        // attach 100% ads array to scope
        $scope.realAds = adsArrayExact;

        // do logic depending on how many ads
        if ($scope.howManyAds == 1) {
          $scope.adsNr = '1 annons';
        } else {
          $scope.adsNr = $scope.howManyAds + ' annonser';
        }
        if ($scope.howManyAdsNear == 1) {
          $scope.adsNrNear = '1 annons';
        } else {
          $scope.adsNrNear = $scope.howManyAdsNear + ' annonser';
        }
      }) // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        PaginationState.setPagination(newPageNumber);
        $scope.paginationPage = newPageNumber;
      }

    }])
