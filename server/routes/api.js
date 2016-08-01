var express = require('express'),
    request = require('request'),
    unirest = require('unirest'),
    app = express();

// Base URL from arbetsförmedlingen
var baseURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/';

module.exports = function(app) {


  // function to extract relevant jobs from an object
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
