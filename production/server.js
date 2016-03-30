var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var app = express();
var router = express.Router();
var routes = require('./routes/index');
var config = require('./config/config')

//HTTPS OPTIONS
var options = {
    cert : config.certificate,
    key : config.private
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/admin', routes.admin);

//ROUTE TO AUTHENTICATING ROUTER
app.use('/authenticate',routes.authenticate);

//ROUTE TO API ROUTER
app.use('/api',routes.api);

//ROUTE TO DEFAULT ROUTER
app.use('/*',routes.default);

app.disable('x-powered-by');

//CREATING HTTPS SERVER
https.createServer(options,app).listen(3000);

console.log("Node Server is running");
