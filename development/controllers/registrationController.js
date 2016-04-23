exports.post = function(req, res){
    var mongoose = require('mongoose');
    var db = mongoose.createConnection('mongodb://127.0.0.1:27017/hospital');
    db.on('err', function(err){
       console.log(err); 
    });
    db.once('open', function(){
        console.log(req.body);
        var schema;
        var model;
        switch(req.body.usertype){
            case 'user':
                schema = require('../models/userSchema');
                model = db.model('users', schema);
            break;
            case 'doctor':
                schema = require('../models/doctorSchema');
                model = db.model('doctors', schema);
            break;
            case 'institution':
                schema = require('../models/institutionSchema');
                model = db.model('insitutions', schema);
            break;
            default : res.status(400).end();
                return;
        }
        model(req.body).save(function(err, doc){
            if(!err){
                res.json(doc);
            }
            if(err){
                console.log(err);
            }
        });
    });
}