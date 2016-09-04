angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('adsInMunicipalityCtrl', [
      '$scope',
      '$http',
      '$routeParams',
      '$rootScope',
      'Helper',
      'LocationHttp',
      function($scope, $http, $routeParams, $rootScope, Helper, LocationHttp) {

      // set page title
      $rootScope.header = sessionStorage.getItem("municipalityName") + ' - IT Jobben';

      // Create variable from param
      var municipalityID = $routeParams.municipalityID;

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


      // make http req
      LocationHttp.municipality(municipalityID).then(function(response) {

        $scope.ads = response.data;

        // Update localStorage value for most recent ad user was exosed to
        // Helper.determineDateMunicipality($scope.ads[0].publiceraddatum, municipalityID);
        $scope.oldDate = localStorage.getItem(['itjobben-date-municipality' + municipalityID]);

        // use helper service date functions to attach dates to scope variables.
        // used to display badges either if ad is new or soon to be expired
        $scope.sevenDaysFromNow = Helper.sevenDaysFromNow();
        $scope.yesterday        = Helper.yesterdayDate();

        // do logic depending on how many ads
        if ($scope.ads.length == 1) {
          $scope.adsNrExact = '1 Annons';
        } else {
          $scope.adsNrExact = $scope.ads.length + ' Annonser';
        }
      }); // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        // set sessionStorage
        sessionStorage.setItem("paginationMunicipality", newPageNumber);
        $scope.paginationPage = newPageNumber;
      };

    }]);
