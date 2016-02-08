angular
  .module('app')

    // Controller for viewing single ad
    .controller('statisticsCtrl', [
      '$scope',
      '$http',
      function($scope, $http) {

        console.log('statisticsCtrl working');



        var theLabels = [];
        var dataAds = [];
        var dataJobs = [];
        var fakeLebels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];


        $http.get('http://localhost:1339/api/yrkesgrupper/', {
          ignoreLoadingBar: true
        })
        .then(function(response) {
          console.log(response);
          $scope.workgroups = response.data.body.soklista.sokdata;

          // loop through response to get chart labels
          for (i = 0; i < $scope.workgroups.length; i++) {
             theLabels.push($scope.workgroups[i].namn);
             dataAds.push($scope.workgroups[i].antal_platsannonser);
             dataJobs.push($scope.workgroups[i].antal_ledigajobb);
          }

          // set scope as labels
          $scope.workgroupLabels = theLabels;
          // Chart.js Data
          $scope.data = {
            labels: fakeLebels,
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


          // console.log(labels);
          console.log('annonser', dataAds);
          console.log('datajobs', dataJobs);
          // $scope.labels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
          // $scope.series2 = ['Series A', 'Series B'];
          //
          // $scope.data2 = [
          //   [65, 59, 80, 81, 56, 55, 40],
          //   [28, 48, 40, 19, 86, 27, 90]
          // ];
          //  $scope.data3 = [dataAds, dataJobs];
          //  $scope.labels3 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
          //  $scope.series3 = ['Antal platsannonser', 'Antal lediga jobb'];

        })

    }])
