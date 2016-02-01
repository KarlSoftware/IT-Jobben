angular
  .module('app')

    // controller to view all the workgroups
    .controller('workGroupsCtrl', ['$scope', '$http', 'WorkGroupState', function($scope, $http, WorkGroupState) {

      console.log('workGroupsCtrl is working');

      $http.get('http://localhost:1339/api/yrkesgrupper/')
      .then(function(response) {
        $scope.result = response;
        $scope.workgroups = response.data.body.soklista.sokdata;
      })

      // change current state of workgroup
      $scope.setWorkgroup = function(workgroup) {
        console.log('du klickade på', workgroup);
        WorkGroupState.setWorkgroup(workgroup);
        console.log("Workgroupstate är nu:" + workgroup);
      }
    }]) // end of controller
