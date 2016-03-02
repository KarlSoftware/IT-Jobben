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
          strings: ["Som programmerare",
                    "Som UX-expert",
                    "Som civilingenjör",
                    "Inom IT helt enkelt",
                    ],
          typeSpeed: 0.6,
          backDelay: 500,
          startDelay: 1000,
          cursorChar: "|"
        });

        new WOW().init();


    }]);
