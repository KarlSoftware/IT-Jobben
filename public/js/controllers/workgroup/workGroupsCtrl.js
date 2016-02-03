angular
  .module('app')

    // controller to view all the workgroups
    .controller('workGroupsCtrl', ['$scope', '$http', 'WorkGroupState', 'BreadcrumbState', function($scope, $http, WorkGroupState, BreadcrumbState) {

      console.log('workGroupsCtrl is working');

      $http.get('http://localhost:1339/api/yrkesgrupper/')
      .then(function(response) {
        $scope.result = response;
        $scope.workgroups = response.data.body.soklista.sokdata;
      })

      // change current state of workgroup
      $scope.setWorkgroup = function(workgroup, breadcrumb) {
        console.log('du klickade på', workgroup);
        WorkGroupState.setWorkgroup(workgroup);
        BreadcrumbState.setWorkgroupBreadcrumb(breadcrumb);
        console.log(BreadcrumbState.getWorkgroupBreadcrumb());
        console.log("Workgroupstate är nu:" + workgroup);
      }
    }]) // end of controller
