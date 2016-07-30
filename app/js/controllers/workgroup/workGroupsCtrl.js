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


        $scope.paginationPage = 1;

        $scope.step2 = false;
        $scope.step3 = false;

        // set page title
        $rootScope.header = 'Hitta jobb inom ett yrke - IT Jobben';

        // call service that makes corrent http get request
        Job.workgroup().then(function(response) {
        $scope.howMany = response.data.body.soklista.totalt_antal_platsannonser + ' annonser och ' + response.data.body.soklista.totalt_antal_platsannonser + ' jobb'
        $scope.workgroups = response.data.body.soklista.sokdata;
        });

        // set sorting
        $scope.step1SortType = 'namn'; // default sorting
        $scope.step1SortReverse = false; // default to a-z, 1-9 etc

        // select a workgroup
        $scope.selectWorkgroup = function(workgroupName, workgroupID) {

          // set query param
          $location.search({grupp: workgroupID});

          $scope.currentWorkgroup = workgroupName;
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
          });

          // set sorting
          $scope.step2SortType = 'namn'; // default sorting
          $scope.step2SortReverse = false; // default to a-z, 1-9 etc
        };


        $scope.selectProfession = function(professionName, professionID) {
          console.log(professionName);
          var currentWorkgroupID = $location.search().grupp;
          $location.search({grupp: currentWorkgroupID, yrke: professionID});

          $scope.currentProfession = professionName;
          // show next step in interaction
          $scope.step3 = true;
          // set empty array to fill up with 100% matching ads
          adsArrayExact = [];

          // call service that makes corrent http get request
          Job.insideProfession($location.search().yrke).then(function(response) {
            var data = response.data.body;
            $scope.adsExact = data.matchningslista.antal_platsannonser_exakta;
            $scope.ads = data.matchningslista.matchningdata;

            // loop through ads to get 100% matches
            for (i = 0; i < $scope.ads.length; i++) {
              if ($scope.ads[i].relevans == 100) {
                adsArrayExact.push($scope.ads[i]);
              }
            }

            // attach 100% ads array to scope
            $scope.realAds = adsArrayExact;

            /*
            * Save most Recent date to localStorage
            * Used so template can display a badge for new ad since user last visited
            */
            // variable for date of most recent ad
            var mostRecentAdDate = adsArrayExact[0].publiceraddatum;
            console.log('mostRecentAdDate', mostRecentAdDate, typeof(mostRecentAdDate));

            // if localStorage already exist
            if (localStorage['itjobben-date-profession' + professionID]) {
              // attach the date from localStorage to scope BEFORE we update localStorage with new date
              $scope.oldDate = localStorage.getItem(['itjobben-date-profession' + professionID]);
              // update localStorage with the most recent ad date
              localStorage['itjobben-date-profession' + professionID] = mostRecentAdDate;
            } else {
              // update localStorage with the most recent ad date
              localStorage['itjobben-date-profession' + professionID] = mostRecentAdDate;
              // attach it to scope after you have set localstorage
              $scope.oldDate = localStorage.getItem(['itjobben-date-profession' + professionID]);
            }

            // do logic depending on how many ads
            if ($scope.adsExact == 1) {
              $scope.adsNrExact = '1 Annons';
            } else {
              $scope.adsNrExact = $scope.adsExact + ' Annonser';
            }
          }); // end of then

        }


        // dir-pagination-controls function to change current pagination page
        $scope.changePagination = function(newPageNumber, oldPageNumber) {

          $scope.paginationPage = newPageNumber;

        };
    }]); // end of controller
