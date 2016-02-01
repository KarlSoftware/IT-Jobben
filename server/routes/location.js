var express = require('express'),
    request = require('request'),
    unirest = require('unirest'),
    app = express();

// Base URL from arbetsförmedlingen
var baseURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/';




module.exports = function(app) {

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
  router.get('/county', function (req, res) {

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

    var Request = unirest.get(baseURL + 'matchning?yrkesomradeid=3&kommunid=' + req.params.municipalityID + '');
    Request.headers({
      'Accept': 'application/json',
      'Accept-Language': 'sv'
    }).end(function (response) {
      res.send(response);
    })

  });


}
