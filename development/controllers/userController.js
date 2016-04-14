

exports.get = function(req, res){
    var mongoose = require('mongoose');
    var token = req.headers['auth-token'];
        token = JSON.parse(token);
        console.log(token);
    
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
        if(token.usertype == 'user'){
            report.find({'patient_aadhaar_id' : ''+token.user_id},'-_id -report_hash -uploadedby -uploaderdesc -__v',function(err, doc){
                if(err){
                    console.log(err);
                    db.close();
                    res.status(500).json({'success':false,'error':'Oops something went wrong'});
                }
                else{
                    if(doc.length != 0){
                        res.status(200).json({'result' : doc});
                        db.close();
                    }
                    else{
                        res.status(204).json({'result' : 'No records in system'});
                        db.close();
                    }
                }
            });
        }
    });
};
exports.post=function(req, res){
    var mongoose = require('mongoose');
    var token;
    try{
        token = JSON.parse(req.headers['auth-token']);
    }
    catch(e){
        res.status(400).json({"error":"Auth-Token invalid"});
        return;
    }
    if(!req.body.data){
        res.status(911).json({'error':'No Data Posted'});
        return;
    }
    var data = req.body.data;
    console.log(token);
    switch(data.optype){
         //DOCTOR SEARCH
        case 'get':
            var query = {};
            
            //PATIENT AADHAAR ID IS COMPULSARY
            if(!req.body.data.get.user_id){
                res.status(200).json({'error': 'User ID required'});
                return;
            }
            query.patient_aadhaar_id = req.body.data.get.user_id;
            
            //SET SEARCH PARAMETERS
            if(req.body.data.get.report_title){
                query.title = req.body.data.get.report_title;
            }
            if(req.body.data.get.test_name){
                console.log(req.body.data.get.test_name);
                query['tests.test_name'] = req.body.data.get.test_name;
            }
            if(req.body.data.get.start_searchdate){
                query.report_date = {};
                query.report_date.$gt = new Date(req.body.data.get.start_searchdate).toISOString();
            }
            if(req.body.data.get.end_searchdate){
                query.report_date = {};
                query.report_date.$lt = new Date(req.body.data.get.end_searchdate).toISOString();
            }
            
            //CHECK IF USER HAS PRIVILEDGES
            if(token.usertype == 'doctor' || token.usertype == 'hospital'){
                //FURTHER CHECK IF USER IS BANNED
                
                //DATABASE CONNECTIVITY
                var db = mongoose.createConnection("mongodb://127.0.0.1/hospital");
                db.on('error', function(){
                    console.error.bind(console, 'connection error:');
                    res.status(403);
                    res.json({
                        success : false,
                        error : 'Oops something went wrong'
                    });
                });
                db.once('open', function(){
                    var reportSchema = require('../models/reportSchema');
                    var report = db.model('reports', reportSchema);
                        report.find(query,'-_id -report_hash -uploadedby -uploaderdesc -__v',function(err, doc){
                            if(err){
                                console.log(err);
                                db.close();
                                res.status(500).json({'success':false,'error':'Oops something went wrong'});
                            }
                            else{
                                if(doc.length != 0){
                                    res.status(200).json({'result' : doc});
                                    db.close();
                                }
                                else{
                                    res.status(204).json({'result' : 'No records in system'});
                                    db.close();
                                }
                            }
                        });
                    
                });
            }
            //USER HAS INSUFFICIENT PRIVILEDGES
            else
                res.status(401).json({'error':'Insufficient priviledges'});
        break;
        //DOCTOR INSERT
        case 'insert':
            
            var generateHash = require('../scripts/Hash'); 
            if(token.usertype == 'doctor' || token.usertype == 'hospital'){
                if(token.usertype == 'doctor' && data.insert.doctor_registration_id != token.user_id){
                    res.status(400).json({"error": "A doctor can only upload reports generated by the doctor itself"});
                }
                var docu = data.insert;
                
                docu['upload_info'].uploadedby = token.user_id;
                docu['upload_info'].uploader_desc = token.usertype;
                var document = JSON.stringify(docu);
                docu.report_hash = generateHash(document);
                docu.upload_date = new Date().toISOString();
                try{
                    var mongoose = require('mongoose');
                    var db = mongoose.createConnection("mongodb://127.0.0.1/hospital");
                    db.on('error', function(){
                        console.error.bind(console, 'connection error:');
                    });
                    db.once('open', function(){
                        var reportSchema = require('../models/reportSchema');
                        var Report = db.model('reports', reportSchema);
                        Report(docu).save(function(err,docs){
                            if(!err){
                                res.json({'success': true, 'message': 'Report successfully added', "report_id": docs.report_id});   
                            }
                            else{
                                console.log(err);
                                res.json({"success": false,'error': 'Problem with data'});
                            }
                            db.close();
                        });
                    });
                }
                catch(e){
                    console.log(e);
                }
            }
            else{
                res.status(401).json({'error':'Insufficient priviledges'});
            }
            
        break;
        //ADMIN UPDATE
        case 'update':
            if(token.usertype=="admin"){
                res.status(400).json({"error": "Invalid Operation"});
            }
            else{
                res.status(400).json({"error":"Insufficient priviledges"});
            }
        
        break;
        //ADMIN DELETE
        case 'delete':
            if(token.usertype=="admin"){
                
                try{
                    var mongoose = require('mongoose');
                    var db = mongoose.createConnection("mongodb://127.0.0.1/hospital");
                    db.on('error', function(){
                        console.error.bind(console, 'connection error:');
                    });
                    db.once('open', function(){
                        var reportSchema = require('../models/reportSchema');
                        var Report = db.model('reports', reportSchema);
                        Report.findOne({"report_id":data.delete.report_id}, function(err,doc){
                            if(!doc){
                                res.json({"Success":false, "error":"Report does not exist"});
                            }
                            else{
                                Report.remove({"report_id":data.delete.report_id}, function(err){
                                    if(!err){
                                         res.json({"success":true, "error":"Report(ID : "+data.delete.report_id+") was successfully removed"});
                                    }
                                });
                            }
                        });
                    });
                }
                catch(e){
                    console.log(e);
                }
               
            }
            else{
                res.status(400).json({"error":"Insufficient priviledges"});
            }
        break;
        default:
            res.status(400).json({"error": "Invalid Operation"});
        break;
    }
};