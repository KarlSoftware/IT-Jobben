angular
  .module('app')

    // controller to view all the workgroups
    .controller('workGroupsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      'WorkgroupHttp',
      function($scope, $http, $rootScope, WorkgroupHttp) {

        // set page title
        $rootScope.header = 'Yrkesgrupper - IT Jobben';

        WorkgroupHttp.workgroup().then(function(response) {
          $scope.howMany = response.data.body.soklista.totalt_antal_platsannonser + ' annonser '
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
