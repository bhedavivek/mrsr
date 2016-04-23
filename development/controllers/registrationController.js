exports.post = function(req, res){
    var mongoose = require('mongoose');
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/hospital');
    db.on('err', function(err){
       console.log(err); 
    });
    db.once('open', function(){
        console.log(req.body);
        var userSchema = require('../models/userSchema');
        var User = db.model('users', userSchema);
        User(req.body).save(function(err, doc){
            if(!err){
                res.json(doc);
            }
            if(err){
                console.log(err);
            }
        });
    });
}