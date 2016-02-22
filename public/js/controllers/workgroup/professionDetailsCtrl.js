angular
  .module('app')

    // Controller to all ads in a profession
    .controller('professionDetailsCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      'WorkGroupState',
      'LocationState',
      'BreadcrumbState',
      'PaginationState',
      function($scope, $http, $stateParams, WorkGroupState, LocationState, BreadcrumbState, PaginationState) {

      // Create variable from param
      var id = $stateParams.professionID;

      // fetch current workgroup
      $scope.currentWorkgroup = sessionStorage.getItem("workgroupName");

      // fetch current profession
      $scope.currentProfession = sessionStorage.getItem("professionName");

      // fetch breadcrumb for workgroup and assign to scope
      $scope.workgroupBreadcrumb = sessionStorage.getItem("workgroupBread");

      // fetch current pagination page. Defaults to 1
      if (PaginationState.getPagination() == 0) {
        $scope.paginationPage = 1;
      } else {
        $scope.paginationPage = PaginationState.getPagination();
      }


      // set empty array to fill up with 100% matching ads
      adsArrayExact = []

      $http.get('http://localhost:1339/api/yrke/' + id)
      .then(function(response) {
        $scope.adsExact = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.adsSimilar = response.data.body.matchningslista.antal_platsannonser_narliggande;
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
        if ($scope.adsExact == 1) {
          $scope.adsNrExact = '1 annons';
        } else {
          $scope.adsNrExact = $scope.adsExact + ' annonser';
        }
        if ($scope.adsSimilar == 1) {
          $scope.adsNrSimilar = '1 snarlik annons';
        } else {
          $scope.adsNrSimilar = $scope.adsSimilar + ' snarlika annonser';
        }
      }) // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        PaginationState.setPagination(newPageNumber);
        $scope.paginationPage = newPageNumber;
      }

    }])
