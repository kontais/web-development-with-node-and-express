var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var multer = require('multer');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/status', function (req, res) {
  res.send('status, ' + req.query.username);
});

app.post('/command', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  res.send('command, ' + req.body.username)
});

app.use(function(req, res, next) {
  res.status(404).send('404 - Not Found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500 - Server Error');
});

var server = app.listen(8080, "192.168.1.101", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('iot server listening at http://%s:%s', host, port);
});
