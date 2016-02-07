angular
  .module('app')

    // Controller to all ads in a profession
    .controller('professionDetailsCtrl', ['$scope', '$http', '$stateParams', 'WorkGroupState', 'LocationState', 'BreadcrumbState', function($scope, $http, $stateParams, WorkGroupState, LocationState, BreadcrumbState) {

      // Create variable from param
      var id = $stateParams.professionID;

      // fetch current workgroup
      $scope.currentWorkgroup = WorkGroupState.getWorkgroup();

      // fetch current profession
      $scope.currentProfession = WorkGroupState.getProfession();

      // fetch breadcrumb for workgroup and assign to scope
      $scope.workgroupBreadcrumb = BreadcrumbState.getWorkgroupBreadcrumb();

      $http.get('http://localhost:1339/api/yrke/' + id)
      .then(function(response) {
        $scope.adsExact = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.adsSimilar = response.data.body.matchningslista.antal_platsannonser_narliggande;
        $scope.ads = response.data.body.matchningslista.matchningdata;
        $scope.data = $scope.ads.slice(0, 10); // set initial results
        console.log(response);
      })

      // infinite scroll function to load more results
      $scope.loadMore = function() {
        $scope.data = $scope.ads.slice(0, $scope.data.length + 10); // set result
      }

    }])
