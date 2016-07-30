var express = require('express'),
    request = require('request'),
    unirest = require('unirest'),
    app = express();

// Base URL from arbetsförmedlingen
var baseURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/';

module.exports = function(app) {


  /* Function to parse search result string to object and extract 100% matching ads
  *
  * @param {String} string The string to parse and filter
  */
  function search(string) {

    var relevantAds = [];

    var parse = JSON.parse(string);
    var object = parse.matchningslista.matchningdata;


    for (i = 0; i < object.length; i++) {
      if (object[i].relevans == 100) {
        console.log('100 relevans');
        relevantAds.push(object[i]);
      }
    }

    return relevantAds;

  } // end of search function

  function relevantJobs(object) {
    var ads = [];

    if (object != undefined) {
      // loop through ads to get 100% matches
      for (i = 0; i < object.length; i++) {
        if (object[i].relevans == 100) {
          ads.push(object[i]);
        }
      }
    } else {
      ads.push(object);
    }


    return ads;
  }


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

  // route for searching
  router.get('/search/:searchTerm', function (req, res) {

    // make request
    request(
      {
        uri: 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesomradeid=3&nyckelord=' + encodeURIComponent(req.params.searchTerm) + '&antalrader=10000',
        method: 'GET',
        encoding: 'UTF-8',
        headers : {
          'Accept': 'application/json',
          'Accept-language': 'sv',
          'Charset': 'UTF-8'
        },
      },
      function (error, response, body) {

        // send 100% matching ads as response with help of search filter function
        res.send(search(body));
    })
  })

  // route to get yrkesgrupper
  router.get('/yrkesgrupper', function(req, res) {

    var Request = unirest.get(baseURL + 'soklista/yrkesgrupper?yrkesomradeid=3');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  }) // end of router

  // get overview of a specifik yrkesgrupp
  router.get('/yrkesgrupp/:id', function(req, res) {

    var Request = unirest.get(baseURL + 'soklista/yrken?yrkesgruppid=' + req.params.id + '');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  }) // end of router

  // route to get all ads in a profession
  router.get('/yrke/:id', function(req, res) {

    var Request = unirest.get('http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesid=' + req.params.id + '&antalrader=10000');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      // relevantJobs(response);
      res.send(relevantJobs(response.body.matchningslista.matchningdata));
    })

  }) // end of router

}
