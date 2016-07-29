angular
  .module('app')

    // controller to view all the workgroups
    .controller('workGroupsCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      '$location',
      function($scope, $http, $rootScope, $location) {

        console.log($location.search());

        $scope.paginationPage = 1;

        $scope.step2 = false;
        $scope.step3 = false;



        // set page title
        $rootScope.header = 'Hitta jobb inom ett yrke - IT Jobben';

        $http.get('api/yrkesgrupper/', {
        ignoreLoadingBar: false
        })
        .then(function(response) {
        $scope.howMany = response.data.body.soklista.totalt_antal_platsannonser + ' annonser och ' + response.data.body.soklista.totalt_antal_platsannonser + ' jobb'
        console.log(response);
        $scope.workgroups = response.data.body.soklista.sokdata;
        });

        // set sorting
        $scope.step1SortType = 'namn'; // default sorting
        $scope.step1SortReverse = false; // default to a-z, 1-9 etc

        // select a workgroup
        $scope.selectWorkgroup = function(workgroupName, workgroupID) {

        $location.search({grupp: workgroupID});

        $scope.currentWorkgroup = workgroupName;
        // show next step in interaction
        $scope.step2 = true;
        // hide step3 if user has moved up and down again
        $scope.step3 = false;
        // console.log(workgroupID);
        $scope.workgroupID = workgroupID;
        $http.get('api/yrkesgrupp/' + $location.search().grupp, {
          ignoreLoadingBar: false
        })
        .then(function(response) {
          $scope.data = response;
          $scope.AdsinGroup = response.data.body.soklista.totalt_antal_platsannonser + ' annonser och ' + response.data.body.soklista.totalt_antal_platsannonser + ' jobb'
          console.log(response);
          $scope.workgroup = response.data.body.soklista.sokdata;
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

          $http.get('api/yrke/' + $location.search().yrke, {
            ignoreLoadingBar: false
          })
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
