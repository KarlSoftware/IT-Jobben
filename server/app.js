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
    res.sendFile(path.resolve('dist/index.html'));
});


var server = http.createServer(app);

server.listen(port, function () {
  console.log('IT jobben server listening on port ' + port +'!');
})
