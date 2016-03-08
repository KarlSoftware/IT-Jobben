angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('adsInMunicipalityCtrl', [
      '$scope',
      '$http',
      '$routeParams',
      '$rootScope',
      function($scope, $http, $routeParams, $rootScope) {

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

      // set empty array to fill up with 100% matching ads
      adsArrayExact = [];

      // make http req
      $http.get('location/match/lan/' + sessionStorage.getItem("countyBread"))
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



        /*
        * Save most Recent date to localStorage
        * Used so template can display a badge for new ad since user last visited
        */
        // variable for date of most recent ad
        var mostRecentAdDate = adsArrayExact[0].publiceraddatum;
        console.log('mostRecentAdDate', mostRecentAdDate, typeof(mostRecentAdDate));

        // if localStorage already exist
        if (localStorage['itjobben-date-municipality' + municipalityID]) {
          // attach the date from localStorage to scope BEFORE we update localStorage with new date
          $scope.oldDate = localStorage.getItem(['itjobben-date-municipality' + municipalityID]);
          // update localStorage with the most recent ad date
          localStorage['itjobben-date-municipality' + municipalityID] = mostRecentAdDate;
        } else {
          // set localStorage as the date of the oldest ad
          localStorage['itjobben-date-municipality' + municipalityID] = mostRecentAdDate;
          // attach it to scope after you have set localstorage
          $scope.oldDate = localStorage.getItem(['itjobben-date-municipality' + municipalityID]);
        }


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
