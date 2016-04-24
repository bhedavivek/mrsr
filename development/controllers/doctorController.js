exports.get = function(req, res){
    var mongoose = require('mongoose');
    var token;
    try{
        token = JSON.parse(req.headers['auth-token']);
    }
    catch(e){
        console.log(e);
        res.status(400).json({"error":"Auth-Token invalid"});
        return;
    }
    var db = mongoose.createConnection("mongodb://127.0.0.1/hospital");
    db.on('error', function(){
        console.error.bind(console, 'connection error:');
        console.log('Connection error');
        res.status(403);
        res.json({
            success : false,
            error : 'Connection error'
        });
    });
    db.once('open', function(){
        var reportSchema = require('../models/reportSchema');
        var report = db.model('reports', reportSchema);
        
        //NORMAL USER REQUEST FOR OWN RECORDS ONLY
        if(token.usertype == 'doctor'){
            report.find({'doctor_registration_id' : ''+token.user_id},'-_id -report_hash -uploadedby -uploaderdesc -__v',{sort : {upload_date : -1}},function(err, docs){
                if(err){
                    console.log(err);
                    db.close();
                    res.status(500).json({'success':false,'error':'Oops something went wrong'});
                }
                else{
                    if(docs.length != 0){
                        res.status(200).json({'success':true,'result' : docs});
                        db.close();
                    }
                    else{
                        res.status(204).json({'success':false,'result' : 'No records in system'});
                        db.close();
                    }
                }
            });
        }
        else{
            res.status(403).end();
        }
    });
};