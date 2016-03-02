angular
  .module('app')

    // Controller to all ads in a profession
    .controller('professionDetailsCtrl', [
      '$scope',
      '$http',
      '$routeParams',
      '$rootScope',
      function($scope, $http, $routeParams, $rootScope) {

      // Create variable from param
      var id = $routeParams.professionID;

      // set page title
      $rootScope.header = sessionStorage.getItem("professionName") + ' - IT Jobben';

      // fetch current workgroup
      $scope.currentWorkgroup = sessionStorage.getItem("workgroupName");

      // fetch current profession
      $scope.currentProfession = sessionStorage.getItem("professionName");

      // fetch breadcrumb for workgroup and assign to scope
      $scope.workgroupBreadcrumb = sessionStorage.getItem("workgroupBread");

      // fetch current pagination page. Defaults to 1
      if (sessionStorage.getItem("paginationProfession") === null) {
        $scope.paginationPage = '1';
      } else {
        $scope.paginationPage = sessionStorage.getItem("paginationProfession");
      }


      // set empty array to fill up with 100% matching ads
      adsArrayExact = [];

      $http.get('api/yrke/' + id, {
        ignoreLoadingBar: false
      })
      .then(function(response) {
        $scope.adsExact = response.data.body.matchningslista.antal_platsannonser_exakta;
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
          $scope.adsNrExact = '1 Annons';
        } else {
          $scope.adsNrExact = $scope.adsExact + ' Annonser';
        }
      }); // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        // set sessionStorage
        sessionStorage.setItem("paginationProfession", newPageNumber);
        $scope.paginationPage = sessionStorage.getItem("paginationProfession");
      };

    }]);
