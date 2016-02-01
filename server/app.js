var express = require('express'),
    app = express(),
    http = require('http'),
    port = 1339;


// Require other modules (files)
var config =  require('./config')(app);
var api =     require('./routes/api')(app);
var location =     require('./routes/location')(app);


var server = http.createServer(app);

server.listen(port, function () {
  console.log('IT jobben server listening on port ' + port +'!');
})
