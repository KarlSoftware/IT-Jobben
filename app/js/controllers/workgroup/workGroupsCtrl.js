angular
  .module('app')

    // controller to view all the workgroups
    .controller('workGroupsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      '$location',
      'Job',
      function($scope, $http, $rootScope, $location, Job) {

        // set page title
        $rootScope.header = 'Hitta jobb inom ett yrke - IT Jobben';

        $scope.paginationPage = 1;

        $scope.step2 = false;
        $scope.step3 = false;

        // set sorting
        $scope.step1SortType    = 'namn'; // default sorting
        $scope.step1SortReverse = false; // default to a-z, 1-9 etc
        $scope.step2SortType    = 'namn'; // default sorting
        $scope.step2SortReverse = false; // default to a-z, 1-9 etc

        // set a variable 7 days into the future
        var sevenDaysFromNow  = moment().add('days', 7);


        // if query param 'spara' is active use cached results and save UX state
        if ($location.search().spara) {

          // set steps to true
          $scope.step2 = true;
          $scope.step3 = true;

          // fill up all scope values from cached sessionStorage
          $scope.howMany           = sessionStorage.cachedHowManyAds;
          $scope.workgroups        = JSON.parse(sessionStorage.cachedWorkgroups);
          $scope.AdsinGroup        = sessionStorage.cachedAdsInGroup;
          $scope.currentWorkgroup  = sessionStorage.cachedCurrentWorkgroupName;
          $scope.workgroup         = JSON.parse(sessionStorage.cachedWorkgroup);
          $scope.currentProfession = sessionStorage.cachedCurrentProfessionName;
          $scope.realAds           = JSON.parse(sessionStorage.cachedProfessionAds);
          $scope.sevenDaysFromNow  = sevenDaysFromNow.format();


        } else {

          console.log('inte sparad!');

          // call service that makes corrent http get request
          Job.workgroup().then(function(response) {
          $scope.howMany    = response.data.body.soklista.totalt_antal_platsannonser + ' annonser';
          $scope.workgroups = response.data.body.soklista.sokdata;

          // cache response
          sessionStorage.cachedHowManyAds = $scope.howMany;
          sessionStorage.cachedWorkgroups = JSON.stringify($scope.workgroups);
          });

        }





        // select a workgroup
        $scope.selectWorkgroup = function(workgroupName, workgroupID) {

          // set query param
          $location.search({grupp: workgroupID});

          $scope.currentWorkgroup = workgroupName;

          // cache workgroup name
          sessionStorage.cachedCurrentWorkgroupName = workgroupName;
          // show next step in interaction
          $scope.step2 = true;
          // hide step3 if user has moved up and down again
          $scope.step3 = false;

          $scope.workgroupID = workgroupID;

          // call service that makes corrent http get request
          Job.insideWorkgroup($location.search().grupp).then(function(response) {
            var data = response.data.body;
            $scope.AdsinGroup = data.soklista.totalt_antal_platsannonser + ' annonser'
            $scope.workgroup = data.soklista.sokdata;

            // cache response
            sessionStorage.cachedAdsInGroup = $scope.AdsinGroup;
            sessionStorage.cachedWorkgroup = JSON.stringify($scope.workgroup);
          });

          // set sorting

        };


        $scope.selectProfession = function(professionName, professionID) {


          // attach seven days from now variable to scope
          $scope.sevenDaysFromNow = sevenDaysFromNow.format();

          var currentWorkgroupID = $location.search().grupp;

          // set url query params
          $location.search({grupp: currentWorkgroupID, yrke: professionID});

          $scope.currentProfession = professionName;
          // cache profession name
          sessionStorage.cachedCurrentProfessionName = professionName;
          // show next step in interaction
          $scope.step3 = true;

          if (localStorage.getItem(['itjobben-date-profession' + $location.search().yrke])) {
            $scope.oldDate = localStorage.getItem(['itjobben-date-profession' + $location.search().yrke]);
          }

          // call service that makes corrent http get request
          Job.insideProfession($location.search().yrke).then(function(response) {
            var data = response.data.body;

            // attach 100% ads array to scope
            $scope.realAds = response.data;

            // cache response
            sessionStorage.cachedProfessionAds = JSON.stringify($scope.realAds);

            /*
            * Save most Recent date to localStorage
            * Used so template can display a badge for new ad since user last visited
            */
            // variable for date of most recent ad
            var mostRecentAdDate = '';
            if (response.data[0] == null) {
              mostRecentAdDate = moment().format();
            } else {
              mostRecentAdDate = response.data[0].publiceraddatum;
            }

            // call job service and determine if localstorage for the date exist or not
            Job.determineDate(mostRecentAdDate, $location.search().yrke);

          }); // end of then

        }

        $scope.saveUX = function() {
          $location.search({
            grupp: $location.search().grupp,
            yrke: $location.search().yrke,
            spara: true
          })
        }


        // dir-pagination-controls function to change current pagination page
        $scope.changePagination = function(newPageNumber, oldPageNumber) {

          $scope.paginationPage = newPageNumber;

        };
    }]); // end of controller
