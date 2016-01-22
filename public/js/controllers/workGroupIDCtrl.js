angular
  .module('app')

    // Controller to view imdb id
    .controller('workGroupIDCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      // Create variable from param
      var workGroupID = $stateParams.workgroupID;

      $http.get('http://localhost:1339/api/yrkesgrupp/' + workGroupID)
      .then(function(response) {
        $scope.data = response;
        $scope.workgroup = response.data.body.soklista.sokdata;
      })

    }])
