require('./db/connect');
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http'),
    unirest = require('unirest'),
    routes = require('./routes/routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(routes);

app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port 8080');
});

exports.app = app;
