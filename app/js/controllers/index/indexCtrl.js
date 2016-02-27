angular
  .module('app')

    // Controller for index page
    .controller('indexCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      '$stateParams',
      function($scope, $http, $rootScope, $stateParams) {

        // set header title
        $rootScope.header = 'IT Jobben';

        $(".typed").typed({
          strings: ["Som frontend-utvecklare",
                    "Som användbarhetsdesigner",
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
