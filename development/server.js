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
app.use('/*',function(req, res){
    res.send("Nikki tu chutiya hai");
});

app.disable('x-powered-by');

//CREATING HTTPS SERVER
app.listen(8001);

console.log("Node Server(Development) is running on PORT : 8001");