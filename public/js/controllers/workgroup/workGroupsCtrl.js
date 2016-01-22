angular
  .module('app')

    .controller('workGroupsCtrl', ['$scope', '$http', function($scope, $http) {

      console.log('workGroupsCtrl is working');

      $http.get('http://localhost:1339/api/yrkesgrupper/')
      .then(function(response) {
        $scope.result = response;
        $scope.workgroups = response.data.body.soklista.sokdata;
      })

    }]) // end of controller
