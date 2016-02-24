/*
* jQuery code to properly collapse the navbar
*/
$(document).on('click','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
      $(this).collapse('hide');
  }
});

angular
  .module('app', [
    'ui.router',
    'angularMoment',
    'angular-loading-bar',
    'infinite-scroll',
    'tc.chartjs',
    'angularUtils.directives.dirPagination'
  ])

  // change Moment language
  .run(function(amMoment) {
    amMoment.changeLocale('sv');
  })

  .config([
    '$urlRouterProvider',
    '$stateProvider',
    'cfpLoadingBarProvider',
    function($urlRouterProvider, $stateProvider, cfpLoadingBarProvider) {

    $urlRouterProvider.otherwise('/');
    cfpLoadingBarProvider.includeSpinner = false; // config for loading bar spinner.


    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/index.html'
      })

      .state('singleAd', {
        url: '/annons/:adID',
        templateUrl: 'templates/singleAd/singleAd.html'
      })

      .state('searchresults', {
        url: '/searchresults',
        templateUrl: 'templates/search/searchResults.html'
      })

      .state('workgroups', {
        url: '/yrkesgrupper',
        templateUrl: 'templates/workgroup/workGroups.html'
      })

      .state('singleWorkgroup', {
        url: '/yrkesgrupper/:workgroupID',
        templateUrl: 'templates/workgroup/singleWorkgroup.html'
      })

      .state('yrkeDetail', {
        url: '/yrke/:professionID',
        templateUrl: 'templates/workgroup/professionDetails.html'
      })

      .state('counties', {
        url: '/lan',
        templateUrl: 'templates/location/counties.html'
      })

      .state('singleCounty', {
        url: '/lan/:countyID',
        templateUrl: 'templates/location/singleCounty.html'
      })

      .state('municipalityAds', {
        url: '/kommun/:municipalityID/ads',
        templateUrl: 'templates/location/adsInMunicipality.html'
      })

      .state('statistics', {
        url: '/statistik',
        templateUrl: 'templates/statistics/workgroupsStats.html'
      })

      .state('singleWorkgroupStats', {
        url: '/statistik/yrkesgrupp/:id',
        templateUrl: 'templates/statistics/singleWorkgroupStats.html'
      })

      .state('statisticsDetails', {
        url: '/statistik/yrke/:id',
        templateUrl: 'templates/statistics/professionStatsDetails.html'
      });


  }]);

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
                    "Inom IT helt enkelt",
                    ],
          typeSpeed: 0.6,
          backDelay: 500,
          startDelay: 1000,
          cursorChar: "|"
        });

        new WOW().init();


    }]);

angular
  .module('app')

    // Controller to get all municipalities in a county
    .controller('adsInMunicipalityCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var municipalityID = $stateParams.municipalityID;

      // fetch current municipality name and county name
      $scope.currentMunicipality = sessionStorage.getItem("municipalityName");
      $scope.currentCounty = sessionStorage.getItem("countyName");

      // fetch current municipality and county breadcrumbs
      $scope.currentMunicipalityBreadcrumb = sessionStorage.getItem("municipalityBread");
      $scope.currentCountyBreadcrumb = sessionStorage.getItem("countyBread");

      // fetch current pagination page. Defaults to 1
      if (sessionStorage.getItem("paginationMunicipality") === null) {
        $scope.paginationPage = '1';
      } else {
        $scope.paginationPage = sessionStorage.getItem("paginationMunicipality");
      }

      // set empty array to fill up with 100% matching ads
      adsArrayExact = [];

      // make http req
      $http.get('http://localhost:1339/location/match/lan/' + sessionStorage.getItem("countyBread"))
      .then(function(response) {
        $scope.adsExact = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.ads = response.data.body.matchningslista.matchningdata;
        console.log(response);

        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].kommunnamn == sessionStorage.getItem("municipalityName")) {
            adsArrayExact.push($scope.ads[i]);
          }
        }

        // attach 100% ads array to scope
        $scope.realAds = adsArrayExact;

        // do logic depending on how many ads
        if ($scope.realAds.length == 1) {
          $scope.adsNrExact = '1 Annons';
        } else {
          $scope.adsNrExact = $scope.realAds.length + ' Annonser';
        }
      }); // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        // set sessionStorage
        sessionStorage.setItem("paginationMunicipality", newPageNumber);
        $scope.paginationPage = newPageNumber;
      };

    }]);

angular
  .module('app')

    // Controller to view all counties
    .controller('countiesCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {



      $http.get('http://localhost:1339/location/counties', {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        $scope.counties = response.data.body.soklista.sokdata;
        console.log(response);
      });

      // set locationState upon clicking a county
      $scope.setLocation = function(location, breadcrumb) {
        console.log('du klickade på', location);
        // set sessionStorage
        sessionStorage.setItem("countyName", location);
        sessionStorage.setItem("countyBread", breadcrumb);
      };
    }])

    // Child Controller to get number of ads in a county
    .controller('countyChildCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

        $http.get('http://localhost:1339/location/match/county/' + $scope.county.id +'', {
          ignoreLoadingBar: false
        })
        .then(function(response) {
          $scope.adsInCounty = response.data.body.matchningslista.antal_platsannonser_exakta;
          if ($scope.adsInCounty == 1) {
            $scope.ads = '1 annons';
          } else {
            $scope.ads = $scope.adsInCounty + ' annonser';
          }
        });

    }]);

angular
  .module('app')

    // Controller to get all municipalities in a municipality
    .controller('municipalitiesCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var countyID = $stateParams.countyID;

      // fetch current location
      $scope.currentCounty = sessionStorage.getItem("countyName");

      // fetch current breadcrumb state for active countyID
      $scope.currentCountyBreadcrumb = sessionStorage.getItem("countyBread");

      // set pagination too 1
      sessionStorage.setItem("paginationMunicipality", '1');

      $http.get('http://localhost:1339/location/municipalities/' + countyID, {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        $scope.municipalities = response.data.body.soklista.sokdata;
        console.log(response);
      });

      // set locationState and breadcrumb state upon clicking a municipality
      $scope.setLocation = function(location, breadcrumb) {
        // set sessionStorage
        sessionStorage.setItem("municipalityName", location);
        sessionStorage.setItem("municipalityBread", breadcrumb);
      };

    }])

    // Child Controller to get number of ads in a municipality
    .controller('municipalityChildCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

      $http.get('http://localhost:1339/location/match/municipality/' + $scope.municipality.id +'', {
        ignoreLoadingBar: false
      })
      .then(function(response) {
        $scope.adsInMunicipality = response.data.body.matchningslista.antal_platsannonser_exakta;
        if ($scope.adsInMunicipality == 1) {
          $scope.ads = '1 annons';
        } else {
          $scope.ads = $scope.adsInMunicipality + ' annonser';
        }
      });

    }]);

angular
  .module('app')

    // Controller for search bar
    .controller('searchBarCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {


      $scope.doSearch = function () {
        // set sessionStorage
        sessionStorage.setItem("searchTerm", $scope.searchterm);
        sessionStorage.setItem("paginationSearch", '1');
      };

    }]);

angular
  .module('app')

    // Controller for search bar results
    .controller('searchResultsCtrl', [
      '$scope',
      '$http',
      function($scope, $http) {

      $scope.searchTerm = sessionStorage.getItem("searchTerm");

      // fetch current pagination page. Defaults to 1
      if (sessionStorage.getItem("paginationSearch") === null) {
        $scope.pagination = '1';
      } else {
        $scope.paginationPage = sessionStorage.getItem("paginationSearch");
      }

      // set empty array to fill up with ads matching above 75%
      adsAbove75 = [];

      $http.get('http://localhost:1339/api/search/' + sessionStorage.getItem("searchTerm"))
      .then(function(response) {
        console.log(response);
        $scope.ads = response.data.body.matchningslista.matchningdata;
        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].relevans == 100) {
            adsAbove75.push($scope.ads[i]);
          }
        }

        $scope.ads75 = adsAbove75;
      }); // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        $scope.paginationPage = newPageNumber;
        // set sessionStorage
        sessionStorage.setItem("paginationSearch", newPageNumber);
        $scope.paginationPage = sessionStorage.getItem("paginationSearch");
      };



      // function to search again
      $scope.search = function () {

        // set empty array to fill up with ads matching above 75%
        adsAbove75 = [];

        // reset pagination page to Defaults
        $scope.paginationPage = '1';

        // set searchterm
        sessionStorage.setItem("searchTerm", $scope.searchterm);
        $scope.searchTerm = sessionStorage.getItem("searchTerm");


        // do http req with new search term
        $http.get('http://localhost:1339/api/search/' + sessionStorage.getItem("searchTerm"))
        .then(function(response) {
          console.log(response);
          $scope.ads = response.data.body.matchningslista.matchningdata;
          // loop through ads to get 100% matches
          for (i = 0; i < $scope.ads.length; i++) {
            if ($scope.ads[i].relevans == 100) {
              adsAbove75.push($scope.ads[i]);
            }
          }

          $scope.ads75 = adsAbove75;
        });

      };


    }]); // end of controller

angular
  .module('app')
    // Controller for viewing single ad
    .controller('singleAdCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var ad = $stateParams.adID;

      // array for random image class to use with jumbotron image
      var randomImage = [
        'code1',
        'code2',
        'code3',
        'code4',
        'code5'
      ];

      // get a random item from image array and assign to scope variables
      $scope.randomImgClass = randomImage[Math.floor(Math.random()*randomImage.length)];

      $http.get('http://localhost:1339/api/singleAd/' + ad + '', {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        console.log(response);
        // attach response to scope variables
        $scope.adDetails = response;
        $scope.annons = response.data.body.platsannons.annons;
        $scope.ansokan = response.data.body.platsannons.ansokan;
        $scope.arbetsplats = response.data.body.platsannons.arbetsplats;
        $scope.krav = response.data.body.platsannons.krav;
        $scope.driverslicenseList = response.data.body.platsannons.krav.korkortslista;
        $scope.villkor = response.data.body.platsannons.villkor;

        // do logic depending on what the response contains
        // logic for sista ansökningsdag
        if ($scope.ansokan.sista_ansokningsdag) {
          if ($scope.ansokan.sista_ansokningsdag === '') {
            $scope.sista_ansokningsdag = 'ingen info';
          } else {
            $scope.sista_ansokningsdag = moment($scope.ansokan.sista_ansokningsdag).format("dddd, Do MMMM, h:mm");
          }
        } else {
          $scope.sista_ansokningsdag = 'ingen info';
        }

        // logic for referens
        if ($scope.ansokan.referens) {
          if ($scope.ansokan.referens === '') {
            $scope.referens = 'ingen info';
          } else {
            $scope.referens = $scope.ansokan.referens;
          }
        } else {
          $scope.referens = 'ingen info';
        }

        // logic for email
        if ($scope.ansokan.epostadress) {
          if ($scope.ansokan.epostadress === '') {
            $scope.epost = 'ingen info';
          } else {
            $scope.epost = $scope.ansokan.epostadress;
          }
        } else {
          $scope.epost = 'ingen info';
        }

        // logic for egenbil
        if ($scope.krav.egenbil) {
            $scope.bil = 'Annonsen kräver egen bil';
          } else {
            $scope.bil = 'Inget krav om egen bil';
          }

      }); // end of http then

    }]);

angular
  .module('app')

    // Controller to all ads in a profession
    .controller('professionStatsDetailsCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var id = $stateParams.id;

      // fetch current workgroup
      $scope.currentWorkgroup = sessionStorage.getItem("workgroupStatsName");

      // fetch current profession
      $scope.currentProfession = sessionStorage.getItem("professionStatsName");

      // fetch breadcrumb for workgroup and assign to scope
      $scope.workgroupBreadcrumb = sessionStorage.getItem("workgroupStatsBread");

      // fetch current pagination page. Defaults to 1
      if (sessionStorage.getItem("paginationStatsProfession") === null) {
        $scope.paginationPage = '1';
      } else {
        $scope.paginationPage = sessionStorage.getItem("paginationStatsProfession");
      }


      // set empty array to fill up with 100% matching ads
      adsArrayExact = [];

      $http.get('http://localhost:1339/api/yrke/' + id)
      .then(function(response) {
        console.log(response);
        $scope.adsExact = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.ads = response.data.body.matchningslista.matchningdata;

        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].relevans == 100) {
            adsArrayExact.push($scope.ads[i]);
          }
        }

        // attach 100% ads array to scope
        $scope.realAds = adsArrayExact;

        // do logic depending on how many ads
        if ($scope.adsExact == 1) {
          $scope.adsNrExact = '1 annons';
        } else {
          $scope.adsNrExact = $scope.adsExact + ' annonser';
        }
      }); // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        // set sessionStorage
        sessionStorage.setItem("paginationStatsProfession", newPageNumber);
        $scope.paginationPage = sessionStorage.getItem("paginationStatsProfession");
      };

    }]);

angular
  .module('app')

    // Controller for viewing single ad
    .controller('singleWorkgroupStatsCtrl', [
      '$scope',
      '$http',
      function($scope, $http) {

        // set current workgroup
        $scope.currentWorkgroup = sessionStorage.getItem("workgroupStatsName");
        $scope.currentBreadcrumb = sessionStorage.getItem("workgroupStatsBread");

        // set pagination session too 1
        sessionStorage.setItem("paginationStatsProfession", '1');

        // empty arrays to be filled up in a for-loop
        var theLabels = []; // actual labels. workgroups and such
        var labelNumbers = []; // numbering for the labels
        var dataAds = []; // the numbers for actual ads
        var dataJobs = []; // the numbers for how many jobs
        var workgroupIds = [];

        // Make http request
        $http.get('http://localhost:1339/api/yrkesgrupp/' + $scope.currentBreadcrumb + '', {

        })
        .then(function(response) {
          console.log(response);
          $scope.workgroups = response.data.body.soklista.sokdata;

          // loop through response to fill out all the arrays to use for the chart
          for (i = 0; i < $scope.workgroups.length; i++) {
            labelNumbers.push(i + 1);
            theLabels.push($scope.workgroups[i].namn);
            dataJobs.push($scope.workgroups[i].antal_ledigajobb);
            dataAds.push($scope.workgroups[i].antal_platsannonser);
            workgroupIds.push($scope.workgroups[i].id);
          }
          console.log(workgroupIds);

          // set workgroup label scope
          $scope.workgroupLabels = theLabels;

          // set scope linking
          $scope.links = workgroupIds;

          // change current state of workgroup
          $scope.setProfession = function(yrke, breadcrumb) {
            // set sessionStorage
            sessionStorage.setItem("professionStatsName", yrke);
            sessionStorage.setItem("professionStatsBread", breadcrumb);
          };

          // Chart.js Data
          $scope.data = {
            labels: labelNumbers,
            datasets: [
              {
                label: 'Antal platsannonser',
                fillColor: 'rgba(25,188,156,0.5)',
                strokeColor: 'rgba(25,188,156,0.5)',
                highlightFill: 'rgba(25,188,156,1)',
                highlightStroke: 'rgba(25,188,156,1)',
                data: dataAds
              },
              {
                label: 'Antal lediga jobb',
                fillColor: 'rgba(151,187,205,0.5)',
                strokeColor: 'rgba(151,187,205,0.8)',
                highlightFill: 'rgba(151,187,205,0.75)',
                highlightStroke: 'rgba(151,187,205,1)',
                data: dataJobs
              }
            ]
          };

          // Chart.js Options
          $scope.options =  {

            // Sets the chart to be responsive
            responsive: true,

            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero : false,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : false,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - If there is a stroke on each bar
            barShowStroke : false,

            //Number - Pixel width of the bar stroke
            barStrokeWidth : 2,

            //Number - Spacing between each of the X value sets
            barValueSpacing : 3,

            //Number - Spacing between data sets within X values
            barDatasetSpacing : 1,

            //String - A legend template
            legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
          };


        });

    }]);

angular
  .module('app')

    // Controller for viewing single ad
    .controller('workgroupsStatsCtrl', [
      '$scope',
      '$http',
      function($scope, $http) {

        // empty arrays to be filled up in a for-loop
        var theLabels = []; // actual labels. workgroups and such
        var labelNumbers = []; // numbering for the labels
        var dataAds = []; // the numbers for actual ads
        var dataJobs = []; // the numbers for how many jobs
        var workgroupIds = [];

        // Make http request
        $http.get('http://localhost:1339/api/yrkesgrupper/', {

        })
        .then(function(response) {
          console.log(response);
          $scope.workgroups = response.data.body.soklista.sokdata;

          // loop through response to fill out all the arrays to use for the chart
          for (i = 0; i < $scope.workgroups.length; i++) {
            labelNumbers.push(i + 1);
            theLabels.push($scope.workgroups[i].namn);
            dataJobs.push($scope.workgroups[i].antal_ledigajobb);
            dataAds.push($scope.workgroups[i].antal_platsannonser);
            workgroupIds.push($scope.workgroups[i].id);
          }
          console.log(workgroupIds);

          // set workgroup label scope
          $scope.workgroupLabels = theLabels;

          // set scope linking
          $scope.links = workgroupIds;

          // click function to set workgroup and BreadcrumbState
          $scope.setWorkgroup = function(workgroup, breadcrumb) {
            // set sessionStorage
            sessionStorage.setItem("workgroupStatsName", workgroup);
            sessionStorage.setItem("workgroupStatsBread", breadcrumb);
          };

          // Chart.js Data
          $scope.data = {
            labels: labelNumbers,
            datasets: [
              {
                label: 'Antal platsannonser',
                fillColor: 'rgba(25,188,156,0.5)',
                strokeColor: 'rgba(25,188,156,0.5)',
                highlightFill: 'rgba(25,188,156,1)',
                highlightStroke: 'rgba(25,188,156,1)',
                data: dataAds
              },
              {
                label: 'Antal lediga jobb',
                fillColor: 'rgba(151,187,205,0.5)',
                strokeColor: 'rgba(151,187,205,0.8)',
                highlightFill: 'rgba(151,187,205,0.75)',
                highlightStroke: 'rgba(151,187,205,1)',
                data: dataJobs
              }
            ]
          };

          // Chart.js Options
          $scope.options =  {

            // Sets the chart to be responsive
            responsive: true,

            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero : false,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : false,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - If there is a stroke on each bar
            barShowStroke : false,

            //Number - Pixel width of the bar stroke
            barStrokeWidth : 2,

            //Number - Spacing between each of the X value sets
            barValueSpacing : 1,

            //Number - Spacing between data sets within X values
            barDatasetSpacing : 1,

            //String - A legend template
            legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
          };


        });

    }]);

angular
  .module('app')

    // Controller to all ads in a profession
    .controller('professionDetailsCtrl', [
      '$scope',
      '$http',
      '$stateParams',
      function($scope, $http, $stateParams) {

      // Create variable from param
      var id = $stateParams.professionID;

      // fetch current workgroup
      $scope.currentWorkgroup = sessionStorage.getItem("workgroupName");

      // fetch current profession
      $scope.currentProfession = sessionStorage.getItem("professionName");

      // fetch breadcrumb for workgroup and assign to scope
      $scope.workgroupBreadcrumb = sessionStorage.getItem("workgroupBread");

      // fetch current pagination page. Defaults to 1
      if (sessionStorage.getItem("paginationProfession") === null) {
        $scope.paginationPage = '1';
      } else {
        $scope.paginationPage = sessionStorage.getItem("paginationProfession");
      }


      // set empty array to fill up with 100% matching ads
      adsArrayExact = [];

      $http.get('http://localhost:1339/api/yrke/' + id)
      .then(function(response) {
        $scope.adsExact = response.data.body.matchningslista.antal_platsannonser_exakta;
        $scope.ads = response.data.body.matchningslista.matchningdata;
        console.log(response);

        // loop through ads to get 100% matches
        for (i = 0; i < $scope.ads.length; i++) {
          if ($scope.ads[i].relevans == 100) {
            adsArrayExact.push($scope.ads[i]);
          }
        }

        // attach 100% ads array to scope
        $scope.realAds = adsArrayExact;

        // do logic depending on how many ads
        if ($scope.adsExact == 1) {
          $scope.adsNrExact = '1 Annons';
        } else {
          $scope.adsNrExact = $scope.adsExact + ' Annonser';
        }
      }); // end of then

      // dir-pagination-controls function to change current pagination page
      $scope.changePagination = function(newPageNumber, oldPageNumber) {
        // set sessionStorage
        sessionStorage.setItem("paginationProfession", newPageNumber);
        $scope.paginationPage = sessionStorage.getItem("paginationProfession");
      };

    }]);

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
        $scope.nrOfJobs = response.data.body.soklista.totalt_antal_ledigajobb;
        $scope.nrOfAds = response.data.body.soklista.totalt_antal_platsannonser;
        console.log(response);
        $scope.workgroup = response.data.body.soklista.sokdata;
      });

      // set sorting
      $scope.sortType = 'namn'; // default sorting
      $scope.sortReverse = false; // default to a-z, 1-9 etc

      // change current state of workgroup
      $scope.setProfession = function(yrke, breadcrumb) {
        // set sessionStorage
        sessionStorage.setItem("professionName", yrke);
        sessionStorage.setItem("professionBread", breadcrumb);
      };

    }]);

angular
  .module('app')

    // controller to view all the workgroups
    .controller('workGroupsCtrl', [
      '$scope',
      '$http',
      function($scope, $http) {

      $http.get('http://localhost:1339/api/yrkesgrupper/', {
        ignoreLoadingBar: true
      })
      .then(function(response) {
        $scope.nrOfAds = response.data.body.soklista.totalt_antal_ledigajobb;
        $scope.nrOfJobs = response.data.body.soklista.totalt_antal_platsannonser;
        console.log(response);
        $scope.workgroups = response.data.body.soklista.sokdata;
      });

      // set sorting
      $scope.sortType = 'namn'; // default sorting
      $scope.sortReverse = false; // default to a-z, 1-9 etc

      // change current state of workgroup
      $scope.setWorkgroup = function(workgroup, breadcrumb) {
        // set sessionStorage
        sessionStorage.setItem("workgroupName", workgroup);
        sessionStorage.setItem("workgroupBread", breadcrumb);
      };
    }]); // end of controller
