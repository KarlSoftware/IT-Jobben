var express = require('express'),
    request = require('request'),
    unirest = require('unirest'),
    app = express();

// Base URL from OMDb api
var baseURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/';
// Base URL from OMDb api
var baseURL2 = 'http://www.omdbapi.com/';





module.exports = function(app) {

  // Declare router
  var router = express.Router();

  // delcare prefix url for api
  app.use('/api', router);



  // Routes
  router.get('/help', function (req, res) {
    res.json({
      message: 'Welcome to the API!',
      });
  });

  // route to get single ad 
  router.get('/singleAd/:annonsid', function (req, res) {

    var Request = unirest.get(baseURL + req.params.annonsid + '');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  });

  // Test URL for testing request node module
  router.get('/test', function (req, res) {

    request(baseURL2 + '?t=frozen&', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body); // Show the HTML for the Google homepage.
      }
    })

  });



}
