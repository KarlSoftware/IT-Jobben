angular
  .module('app')

    // Controller to all ads in a profession
    .controller('professionStatsDetailsCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var id = $stateParams.id;

      // fetch current workgroup
      $scope.currentWorkgroup = sessionStorage.getItem("workgroupStatsName");

      // fetch current profession
      $scope.currentProfession = sessionStorage.getItem("professionStatsName");

      // fetch breadcrumb for workgroup and assign to scope
      $scope.workgroupBreadcrumb = sessionStorage.getItem("workgroupStatsBread");

      // fetch current pagination page. Defaults to 1
      if (sessionStorage.getItem("paginationStatsProfession") === null) {
        $scope.paginationPage = '1';
      } else {
        $scope.paginationPage = sessionStorage.getItem("paginationStatsProfession");
      }


      // set empty array to fill up with 100% matching ads
      adsArrayExact = []

      $http.get('http://localhost:1339/api/yrke/' + id)
      .then(function(response) {
        console.log(response);
        $scope.adsExact = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.ads = response.data.body.matchningslista.matchningdata;

        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].relevans == 100) {
            adsArrayExact.push($scope.ads[i]);
          }
        }

        // attach 100% ads array to scope
        $scope.realAds = adsArrayExact;

        // do logic depending on how many ads
        if ($scope.adsExact == 1) {
          $scope.adsNrExact = '1 annons';
        } else {
          $scope.adsNrExact = $scope.adsExact + ' annonser';
        }
      }) // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        // set sessionStorage
        sessionStorage.setItem("paginationStatsProfession", newPageNumber);
        $scope.paginationPage = sessionStorage.getItem("paginationStatsProfession");
      }

    }])
