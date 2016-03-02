var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    port = 1339;


// Require other modules (files)
var config =  require('./config')(app);
var api =     require('./routes/api')(app);
var location =     require('./routes/location')(app);

app.get('*', function(req, res) {
    // send the index.html for other files to support HTML5Mode
    // Only run this environment when on digitalocean branch
    if (process.env.NODE_ENV == 'production') {
      res.sendFile(path.resolve('dist/index.html'));
    }
    // Only run this environemnt when on master / features branches
    if (process.env.NODE_ENV == 'development') {
      res.sendFile(path.resolve('app/index.html'));
    }
});


var server = http.createServer(app);

server.listen(port, function () {
  console.log('IT jobben server listening on port ' + port +'!');
})
