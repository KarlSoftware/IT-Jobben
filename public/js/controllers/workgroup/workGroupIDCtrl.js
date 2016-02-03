angular
  .module('app')

    // Controller to all professions in a workgroup
    .controller('workGroupIDCtrl', ['$scope', '$http', '$stateParams', 'WorkGroupState', function($scope, $http, $stateParams, WorkGroupState) {

      // Create variable from param
      var workGroupID = $stateParams.workgroupID;

      // fetch current workgroup
      $scope.currentWorkgroup = WorkGroupState.getWorkgroup();

      $http.get('http://localhost:1339/api/yrkesgrupp/' + workGroupID)
      .then(function(response) {
        $scope.data = response;
        console.log(response);
        $scope.workgroup = response.data.body.soklista.sokdata;
      })

      // change current state of workgroup
      $scope.setProfession = function(yrke) {
        console.log('du klickade på', yrke);
        WorkGroupState.setProfession(yrke);
        console.log("Workgroupstate är nu:" + yrke);
      }

    }])
