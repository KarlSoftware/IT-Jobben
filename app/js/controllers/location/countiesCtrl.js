angular
  .module('app')

    // Controller to view all counties
    .controller('countiesCtrl', [
      '$scope',
      '$http',
      '$rootScope',
      '$location',
      function($scope, $http, $rootScope, $location) {


        // set page title
        $rootScope.header = 'Hitta jobb efter plats - IT Jobben';

        // set a variable 7 days into the future
        var sevenDaysFromNow  = moment().add('days', 7);

        /*
        * function to handle the selected county
        * @param {string} location the current county
        * @param {int} id the id of the county
        */
        function selectedCounty(location, id) {

          $scope.currentCounty = location;

          $location.search({län: id});

          $scope.paginationPage = 1;

          $http.get('location/municipalities/' + $location.search().län, {
            ignoreLoadingBar: false
          })
          .then(function(response) {
            $scope.municipalities = response.data.body.soklista.sokdata;

            // cache the response
            sessionStorage.cachedMuni = JSON.stringify(response.data.body.soklista.sokdata);
          });
        }

        /*
        * function to handle the selected municipality
        * @param {int} currentCounty the current county id
        * @param {string} location the current municipality name
        * @param {int} id the current municipality id
         */
        function selectedMuni(currentCounty, location, id) {

          // get current muni name
          $scope.municipality = location;
          // set new query params
          $location.search({län: currentCounty, kommun: id, sida: "1"});

          $http.get('location/municipality/' + id)
          .then(function(response) {
            $scope.ads = response.data;
            $scope.sevenDaysFromNow  = sevenDaysFromNow.format();

            // cache the response
            sessionStorage.cachedAds = JSON.stringify(response.data);

          })

          // set pagination from query params
          $scope.paginationPage = "1";
        }

        // step2 and step3 defaults to false
        $scope.step2 = false;
        $scope.step3 = false;
        $scope.shortcut = false;


        // logic depending on user is returning to view or not
        // check query params if 'sparad' is active
        // if it is then use cached sessionStorage values for scope variables
        // else the UX steps are in place
        if ($location.search().spara) {

          $scope.step2 = true;
          $scope.step3 = true;
          $scope.shortcut = true;

          // get cached values from sessionStorage
          $scope.counties = JSON.parse(sessionStorage.cachedCounties);
          $scope.currentCounty = sessionStorage.currentCounty;
          $scope.municipalities = JSON.parse(sessionStorage.cachedMuni);
          $scope.municipality = sessionStorage.currentMuni;
          $scope.ads = JSON.parse(sessionStorage.cachedAds)
          $scope.paginationPage = "1";
          $scope.sevenDaysFromNow  = sevenDaysFromNow.format();


        } else {

          $http.get('location/counties', {
            ignoreLoadingBar: true
          })
          .then(function(response) {
            $scope.counties = response.data.body.soklista.sokdata;
            // cache counties
            sessionStorage.cachedCounties = JSON.stringify($scope.counties);
          });

        } // end of logic depending on UX


        // set locationState upon clicking a county
        $scope.selectCounty = function(location, id) {

          // step 2 is visible
          $scope.step2 = true;
          // hide step 3
          $scope.step3 = false;

          // cache current county name
          sessionStorage.currentCounty = location;

          // call function that handles http req and query params
          selectedCounty(location, id);

        };

        $scope.selectMunicipality = function(location, muniID) {

          // get current country id from query params
          var currentCounty = $location.search().län;

          // step3 is now visible
          $scope.step3 = true;
          // cache current muni name
          sessionStorage.currentMuni = location;
          // call function that handles http req, query params and pagination
          selectedMuni(currentCounty, location, muniID);

        }

        $scope.saveUX = function() {
          // update query params with 'spara' value
          // for use when user returns to this view and then displays cached results
          $location.search({
            län: $location.search().län,
            kommun: $location.search().kommun,
            spara: true
          });

        }

        // dir-pagination-controls function to change current pagination page
        $scope.changePagination = function(newPageNumber, oldPageNumber) {

          $scope.paginationPage = newPageNumber;
          $location.search({län: $location.search().län, kommun: $location.search().kommun, sida: newPageNumber});
        };

    }])
