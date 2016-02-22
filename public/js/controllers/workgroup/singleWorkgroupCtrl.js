angular
  .module('app')

    // Controller to all professions in a workgroup
    .controller('workGroupIDCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var workGroupID = $stateParams.workgroupID;

      // fetch current workgroup
      $scope.currentWorkgroup = sessionStorage.getItem("workgroupName");

      // fetch breadcrumb for workgroup and assign to scope
      $scope.workgroupBreadcrumb = sessionStorage.getItem("workgroupBread");

      // reset pagination back too 1
      sessionStorage.setItem("paginationProfession", '1');

      $http.get('http://localhost:1339/api/yrkesgrupp/' + workGroupID, {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        $scope.data = response;
        console.log(response);
        $scope.workgroup = response.data.body.soklista.sokdata;
      })

      // set sorting
      $scope.sortType = 'namn'; // default sorting
      $scope.sortReverse = false; // default to a-z, 1-9 etc

      // change current state of workgroup
      $scope.setProfession = function(yrke, breadcrumb) {
        // set sessionStorage
        sessionStorage.setItem("professionName", yrke);
        sessionStorage.setItem("professionBread", breadcrumb);
      }

    }])
