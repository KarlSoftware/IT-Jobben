angular
  .module('app')

    // Controller to view all counties
    .controller('indexCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {


        console.log('hello from index');

        $(".typed").typed({
          strings: ["Som frontend-utvecklare",
                    "Som användbarhetsdesigner",
                    "Som civilingenjör",
                    "Inom IT",
                    ],
          typeSpeed: 0.6,
          backDelay: 1000,
          startDelay: 1000,
        });

        new WOW().init();


    }])
