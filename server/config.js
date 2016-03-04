var express = require('express'),
    requestLanguage = require('express-request-language'),
    app = express();


module.exports = function(app) {

  // Logger midleware function
  function logger(req,res,next){
    console.log(new Date(), req.method, req.url), req.params;
    next();
  }

  //CORS middleware
  var allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }

  // Use the logger and CORS middleware
  app.use(allowCrossDomain);
  app.use(logger);


  /*
  * serve static files depending on environment variable
  */
  
  // serving produciton files
  if (process.env.NODE_ENV == 'production') {
    console.log('RUNNING PRODUCTION MODE');
    app.use(express.static(__dirname + './../dist'));
  }
  // serving development files
  if (process.env.NODE_ENV == 'development') {
    console.log('RUNNING DEVELOPMENT MODE');
    app.use(express.static(__dirname + './../app'));
    app.use('/lib', express.static(__dirname + './../lib'));
  }



}
