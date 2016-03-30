var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var app = express();
var router = express.Router();
var routes = require('./routes/index');
var config = require('./config/config');
var generateHash = require('./scripts/Hash');

//HTTPS OPTIONS
var options = {
    cert : config.certificate,
    key : config.private
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//ROUTE TO DEFAULT ROUTER
app.use('/*',function(req, res){
    var token;
    if(req.headers['auth-token']){
        try{
            token = JSON.parse(req.headers['auth-token']);
        }
        catch(e){
            res.status(400).json({'success':false, 'error':'auth-token invalid'});
        }
    }
    if(token.usertype == 'doctor' || token.usertype == 'hospital'){
        var docu = req.body.data.insert;
        docu.uploadedby = token.user_id;
        docu.uploaderdesc = token.usertype;
        var document = JSON.stringify(docu);
        docu.report_hash = generateHash(document);
        try{
            var mongoose = require('mongoose');
            var db = mongoose.createConnection("mongodb://127.0.0.1/hospital");
            db.on('error', function(){
                console.error.bind(console, 'connection error:');
            });
            db.once('open', function(){
                var reportSchema = require('./models/reportSchema');
                var Report = db.model('reports', reportSchema);
                Report(docu).save(function(err){
                    if(!err){
                            res.json({'success': true, 'message': 'Insert successful'});   
                    }
                    else{
                        res.json({'error': 'Problem with data'});
                    }
                    db.close();
                });
            });
            
        }
        catch(e){
            
        }
    }
    else{
        res.status(401).json({'error':'Insufficient priviledges'});
    }
});

app.disable('x-powered-by');

//CREATING HTTPS SERVER
https.createServer(options,app).listen(8002);

console.log("Node Server(Development) is running on PORT : 8001");