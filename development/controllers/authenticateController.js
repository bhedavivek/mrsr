var mongoose = require('mongoose');
var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
exports.post = function(req, res){
    try{
        switch(req.body.usertype){
            case 'user':
                authenticateUser(req, res);
            break;
            case 'doctor':
                authenticateDoctor(req, res);
            break;
            case 'institution':
                authenticateInstitution(req, res);
            break;
            case 'admin':
                authenticateAdmin(req, res);
            break;
            default:
                res.status(400).end();
            break;
        }
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Oops!");
    }
}

function authenticateUser(req, res){
    console.log('1');
    var db = mongoose.createConnection("mongodb://127.0.0.1/hospital");
    db.on('error', function(){
        console.error.bind(console, 'connection error:');
        res.status(403);
        res.json({
            success : false,
            error : 'Oops something went wrong'
        });
    });
    console.log('2');
    db.once('open', function(){
        console.log('3'); 
        var userSchema = require('../models/userSchema');
        var User = db.model('users',userSchema);
        User.findOne({"user_aadhaar_id" : req.body.user_id},'user_password user_aadhaar_id', function(err, doc){
            console.log('4');
            if(err){
                console.log(err);
                res.status(403).end();
            }
            else if(doc==null){
                console.log('User not found');
                res.status(403).end();   
            }
            else{
                console.log(doc);
                if(doc.user_password == req.body.user_password){
                    res.json({"auth-token" : {
                        "user_id" : doc.user_aadhaar_id,
                        "usertype" : "user"
                    }});
                }
                else{
                    console.log('Password mismatch');
                    res.status(403).end();
                }
            }
            db.close();
        });
    });
}

function authenticateDoctor(req, res){
    
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
        var doctorSchema = require('../models/doctorSchema');
        var Doctor = db.model('doctors',doctorSchema);
        Doctor.findOne({"doctor_registration_id" : req.body.user_id},'doctor_password doctor_registration_id', function(err, doc){
            console.log('4');
            if(err){
                console.log(err);
                res.status(403).end();
            }
            else if(doc==null){
                console.log('User not found');
                res.status(403).end();   
            }
            else{
                console.log(doc);
                if(doc.doctor_password == req.body.user_password){
                    res.json({"auth-token" : {
                        "user_id" : doc.doctor_registration_id,
                        "usertype" : "doctor"
                    }});
                }
                else{
                    console.log('Password mismatch');
                    res.status(403).end();
                }
            }
            db.close();
        });
    });
}

function authenticateInstitution(req, res){
    
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
        var institutionSchema = require('../models/institutionSchema');
        var Institution = db.model('institutions',institutionSchema);
        Insitution.findOne({"institution_id" : req.body.user_id},'institution_password institution_id', function(err, doc){
            console.log('4');
            if(err){
                console.log(err);
                res.status(403).end();
            }
            else if(doc==null){
                console.log('User not found');
                res.status(403).end();   
            }
            else{
                console.log(doc);
                if(doc.institution_password == req.body.user_password){
                    res.json({"auth-token" : {
                        "user_id" : doc.institution_id,
                        "usertype" : "hospital"
                    }});
                }
                else{
                    console.log('Password mismatch');
                    res.status(403).end();
                }
            }
            db.close();
        });
    });
    
}

function authenticateAdmin(req, res){
    
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
        var adminSchema = require('../models/adminSchema');
        var Admin = db.model('users',adminSchema);
        User.findOne({"admin_id" : req.body.user_id},'admin_password admin_id', function(err, doc){
            console.log('4');
            if(err){
                console.log(err);
                res.status(403).end();
            }
            else if(doc==null){
                console.log('User not found');
                res.status(403).end();   
            }
            else{
                console.log(doc);
                if(doc.user_password == req.body.user_password){
                    res.json({"auth-token" : {
                        "user_id" : doc.admin_id,
                        "usertype" : "admin"
                    }});
                }
                else{
                    console.log('Password mismatch');
                    res.status(403).end();
                }
            }
            db.close();
        });
    });
    
}