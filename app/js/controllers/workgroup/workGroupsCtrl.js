angular
  .module('app')

    // controller to view all the workgroups
    .controller('workGroupsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      function($scope, $http, $rootScope) {

        // set page title
        $rootScope.header = 'Yrkesgrupper - IT Jobben';

        $http.get('api/yrkesgrupper/', {
        ignoreLoadingBar: false
        })
        .then(function(response) {
        $scope.nrOfJobs = response.data.body.soklista.totalt_antal_ledigajobb;
        $scope.nrOfAds = response.data.body.soklista.totalt_antal_platsannonser;
        console.log(response);
        $scope.workgroups = response.data.body.soklista.sokdata;
        });

        // set sorting
        $scope.sortType = 'namn'; // default sorting
        $scope.sortReverse = false; // default to a-z, 1-9 etc

        // change current state of workgroup
        $scope.setWorkgroup = function(workgroup, breadcrumb) {
        // set sessionStorage
        sessionStorage.setItem("workgroupName", workgroup);
        sessionStorage.setItem("workgroupBread", breadcrumb);
        };
    }]); // end of controller
