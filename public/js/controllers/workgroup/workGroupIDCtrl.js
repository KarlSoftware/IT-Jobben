angular
  .module('app')

    // Controller to view imdb id
    .controller('workGroupIDCtrl', ['$scope', '$http', '$stateParams', 'WorkGroupState', function($scope, $http, $stateParams, WorkGroupState) {

      // Create variable from param
      var workGroupID = $stateParams.workgroupID;

      // fetch current workgroup
      $scope.currentWorkgroup = WorkGroupState.getSetWorkgroup();

      $http.get('http://localhost:1339/api/yrkesgrupp/' + workGroupID)
      .then(function(response) {
        $scope.data = response;
        $scope.workgroup = response.data.body.soklista.sokdata;
      })

    }])
