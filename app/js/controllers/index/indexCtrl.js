angular
  .module('app')

    // Controller for index page
    .controller('indexCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      function($scope, $http, $rootScope) {

        // set header title
        $rootScope.header = 'IT Jobben';

        $(".typed").typed({
          strings: ["Inom Frontend",
                    "Som UX-Guru",
                    "Som IT-konsult",
                    "Inom IT helt enkelt",
                    ],
          typeSpeed: 0.6,
          backDelay: 500,
          startDelay: 1000,
          cursorChar: "|"
        });



    }]);
