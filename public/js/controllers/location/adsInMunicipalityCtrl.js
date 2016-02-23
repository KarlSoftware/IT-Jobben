angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('adsInMunicipalityCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var municipalityID = $stateParams.municipalityID;

      // fetch current municipality name and county name
      $scope.currentMunicipality = sessionStorage.getItem("municipalityName");
      $scope.currentCounty = sessionStorage.getItem("countyName");

      // fetch current municipality and county breadcrumbs
      $scope.currentMunicipalityBreadcrumb = sessionStorage.getItem("municipalityBread");
      $scope.currentCountyBreadcrumb = sessionStorage.getItem("countyBread");

      // fetch current pagination page. Defaults to 1
      if (sessionStorage.getItem("paginationMunicipality") === null) {
        $scope.paginationPage = '1';
      } else {
        $scope.paginationPage = sessionStorage.getItem("paginationMunicipality");
      }

      // set empty array to fill up with 100% matching ads
      adsArrayExact = [];

      // make http req
      $http.get('http://localhost:1339/location/match/lan/' + sessionStorage.getItem("countyBread"))
      .then(function(response) {
        $scope.adsExact = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.ads = response.data.body.matchningslista.matchningdata;
        console.log(response);

        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].kommunnamn == sessionStorage.getItem("municipalityName")) {
            adsArrayExact.push($scope.ads[i]);
          }
        }

        // attach 100% ads array to scope
        $scope.realAds = adsArrayExact;

        // do logic depending on how many ads
        if ($scope.realAds.length == 1) {
          $scope.adsNrExact = '1 Annons';
        } else {
          $scope.adsNrExact = $scope.realAds.length + ' Annonser';
        }
      }); // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        // set sessionStorage
        sessionStorage.setItem("paginationMunicipality", newPageNumber);
        $scope.paginationPage = newPageNumber;
      };

    }]);
