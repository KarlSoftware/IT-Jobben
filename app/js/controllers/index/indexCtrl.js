angular
  .module('app')

    // Controller to view all counties
    .controller('indexCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

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
