var express = require('express'),
    requestLanguage = require('express-request-language'),
    vary = require('vary'),
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

  // Use the logger middleware
  app.use(allowCrossDomain);
  app.use(logger);


  // serve static files
  app.use(express.static(__dirname + './../public'));
  app.use('/lib', express.static(__dirname + './../public/lib'));
  app.use('/node_modules', express.static(__dirname + './../node_modules'));


}
