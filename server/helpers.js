/*
* Helper file containing functions used by routes
*/

module.exports = {

  /* Function to parse search result string to object and extract 100% matching ads
  *
  * @param {String} string The string to parse and filter
  */
  search: function(string) {

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
  }, // end of search

  /*
  * Function to parse an object and return an array containing 100% matching ads
  * @param {Object} object the object to filter though
  */
  relevantAds: function(object) {

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
  }, // end of function




};
