angular
  .module('app')

    // controller to view all the workgroups
    .controller('workGroupsCtrl', [
      '$scope',
      '$http',
      'WorkGroupState',
      'BreadcrumbState',
      function($scope, $http, WorkGroupState, BreadcrumbState) {

      console.log('workGroupsCtrl is working');

      $http.get('http://localhost:1339/api/yrkesgrupper/', {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        $scope.result = response;
        console.log(response);
        $scope.workgroups = response.data.body.soklista.sokdata;
      })

      // set sorting
      $scope.sortType = 'namn'; // default sorting
      $scope.sortReverse = false; // default to a-z, 1-9 etc


      // change current state of workgroup
      $scope.setWorkgroup = function(workgroup, breadcrumb) {
        console.log('du klickade på', workgroup);
        WorkGroupState.setWorkgroup(workgroup);
        BreadcrumbState.setWorkgroupBreadcrumb(breadcrumb);
        console.log(BreadcrumbState.getWorkgroupBreadcrumb());
        console.log("Workgroupstate är nu:" + workgroup);
        // set sessionStorage
        sessionStorage.setItem("workgroupName", workgroup);
        sessionStorage.setItem("workgroupBread", breadcrumb);
      }
    }]) // end of controller
