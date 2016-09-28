var express = require('express'),
    request = require('request'),
    unirest = require('unirest'),
    app = express(),
    helpers = require('../helpers');

// Base URL from arbetsförmedlingen
var baseURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/';

module.exports = function(app) {
  
  // Declare router
  var router = express.Router();

  // delcare prefix url for api
  app.use('/search', router);

  // route for searching
  router.get('/search/:searchTerm', function (req, res) {

    // make request
    request(
      {
        uri: baseURL + 'matchning?yrkesomradeid=3&nyckelord=' + encodeURIComponent(req.params.searchTerm) + '&antalrader=10000',
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
        res.send(helpers.search(body));
    })
  })

}
