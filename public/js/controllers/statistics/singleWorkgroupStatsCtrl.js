angular
  .module('app')

    // Controller for viewing single ad
    .controller('singleWorkgroupStatsCtrl', [
      '$scope',
      '$http',
      function($scope, $http) {

        console.log('working')
        // set current workgroup
        $scope.currentWorkgroup = sessionStorage.getItem("workgroupStatsName");
        $scope.currentBreadcrumb = sessionStorage.getItem("workgroupStatsBread");

        // set pagination session too 1
        sessionStorage.setItem("paginationStatsProfession", '1');

        // empty arrays to be filled up in a for-loop
        var theLabels = []; // actual labels. workgroups and such
        var labelNumbers = [] // numbering for the labels
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
          }

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


        })

    }])
