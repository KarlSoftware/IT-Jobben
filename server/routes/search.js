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

    // only loop through object if not undefined
    // else server crashes
    if (object != undefined) {
      for (i = 0; i < object.length; i++) {
        if (object[i].relevans == 100) {
          relevantAds.push(object[i]);
        }
      }
    }


    return relevantAds;

  } // end of search function


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
        res.send(search(body));
    })
  })

}
