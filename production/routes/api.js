var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isAuthenticated = require('../controllers/checkAuthenticationController');
//AUTHENTICATE REQUESTS MADE TO API
router.use(isAuthenticated);

//API END POINTS

//test
router.route('/user')
    .get(getUser)
    .put(putUser);

//Single User Reports
router.route('/reports')
    .get(function(req, res){
    });
router.route('')
    .all(function(req, res){
        res.status(403);
        res.end();
    });
module.exports = router;

var getUser = function(req, res){
    var db = mongoose.createConnection("mongodb://localhost/hospital");
    db.on('error', function(){
        console.error.bind(console, 'connection error:');
        res.status(403);
        res.json({
            success : false,
            error : 'Oops something went wrong'
        });
    });
    db.once('open', function(){
        var reportSchema = require('./models/reports');
        var report = db.model('reportcollection', reportSchema);
        report.find(null,function(err, doc){
            if(err){
                
            }
            else{
                res.json(doc);
            }
        });
    });
    db.disconnect();
}
var putUser = function(req, res){
    res.status(403);
    res.end();
}