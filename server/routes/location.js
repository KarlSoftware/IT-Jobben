var express = require('express'),
    request = require('request'),
    unirest = require('unirest'),
    app = express();

// Base URL from arbetsförmedlingen
var baseURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/';

module.exports = function(app) {


  /*
  * Function to parse search result and extract 100 relevant jobs in a municipality
  * @param {Object} object the object to filter though 
  */
  function municipalityFiltering(object) {

    console.log(typeof(object));
    // console.log(object);
    var relevantAds = [];

    if (object != undefined) {
      // loop through ads to get 100% matches
      for (i = 0; i < object.length; i++) {
        if (object[i].relevans == 100) {
          relevantAds.push(object[i]);
        }
      }
    } else {
      relevantAds.push(object);
    }

    return relevantAds;
  }

  // Declare router
  var router = express.Router();

  // delcare prefix url for api
  app.use('/location', router);

  // Routes
  router.get('/help', function (req, res) {
    res.json({
      message: 'Welcome to the API!',
      });
  });

  // route to get a list of all the countys (län)
  router.get('/counties', function (req, res) {

    var Request = unirest.get(baseURL + 'soklista/lan');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  });

  // route to get a list of all municipalities (kommuner) in a county (län)
  router.get('/municipalities/:countyID', function (req, res) {

    var Request = unirest.get(baseURL + 'soklista/kommuner?lanid=' + req.params.countyID + '');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  });

  // route to get a matching list of all ads in a municipality
  router.get('/municipality/:municipalityID', function (req, res) {

    var Request = unirest.get(baseURL + 'matchning?yrkesomradeid=3&kommunid=' + req.params.municipalityID + '&antalrader=10000');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(municipalityFiltering(response.body.matchningslista.matchningdata));
    })

  });

  // route to match all ads in a county. Use this primarily to get total ad nr in a county
  router.get('/match/county/:countyID', function (req, res) {

    var Request = unirest.get(baseURL + 'matchning?yrkesomradeid=3&lanid=' + req.params.countyID + '');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  });

  // route to match all ads in a municipality. Use this primarily to get total ad nr in a municipality
  router.get('/match/municipality/:municipalityID', function (req, res) {

    var Request = unirest.get(baseURL + 'matchning?yrkesomradeid=3&kommunid=' + req.params.municipalityID + '');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  });

  // route to match all ads in a county. Use this primarily to get total ad nr in a county
  router.get('/match/lan/:lanID', function (req, res) {

    var Request = unirest.get(baseURL + 'matchning?yrkesomradeid=3&lanid=' + req.params.lanID + '&antalrader=10000');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  });

}
