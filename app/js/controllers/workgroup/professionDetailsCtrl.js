angular
  .module('app')

    // Controller to all ads in a profession
    .controller('professionDetailsCtrl', [
      '$scope',
      '$http',
      '$routeParams',
      '$rootScope',
      'Job',
      'Helper',
      function($scope, $http, $routeParams, $rootScope, Job, Helper) {

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


      // make http request
      Job.insideProfession(id).then(function(response) {

        // attach 100% ads array to scope
        $scope.realAds = response.data;

        // variable for date of most recent ad
        var mostRecentAdDate = $scope.realAds[0].publiceraddatum;

        // call job service and determine if localstorage for the date exist or not
        // Helper.determineDateProfession(mostRecentAdDate, id);

        // use helper service date functions to attach dates to scope variables.
        // used to display badges either if ad is new or soon to be expired
        $scope.yesterday = Helper.yesterdayDate();
        $scope.sevenDaysFromNow = Helper.sevenDaysFromNow();

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
