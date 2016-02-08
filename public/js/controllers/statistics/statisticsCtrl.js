angular
  .module('app')

    // Controller for viewing single ad
    .controller('statisticsCtrl', [
      '$scope',
      '$http',
      function($scope, $http) {

        console.log('statisticsCtrl working');

        $http.get('http://localhost:1339/api/yrkesgrupper/', {
          ignoreLoadingBar: true
        })
        .then(function(response) {
          console.log(response);
          $scope.workgroups = response.data.body.soklista.sokdata;
        })

    }])
