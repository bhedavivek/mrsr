var mongoose = require('mongoose');
var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
exports.post = function(req, res){
    try{
        mongoose.connection.close();
        //mongoose.connect(config.database.url+':'+config.database.port+'/'+config.database.name);
        //var userSchema = require('../models/users');
        //var User = mongoose.model('users',userSchema);
        switch(req.body.type){
            case 'user':
                console.log('switch worked');
                authenticateUser(req, res);
            break;
            case 'doctor':
                res.status(403).end();
            break;
            case 'institution':
                res.status(403).end();
            break;
            case 'admin':
                res.status(403).end();
            break;
            default:
                res.status(403).end();
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
    mongoose.connect(config.database.url+':'+config.database.port+'/'+config.database.name);
    var userSchema = require('../models/userSchema');
    var User = mongoose.model('users',userSchema);
    User.findOne({user_aadhar_number : req.body.username},'user_password user_aadhar_number type', function(err, doc){
        if(err){
            console.log(err);
            mongoose.connection.close();
            res.status(403).end();
        }
        else if(doc==null){
            console.log('User not found');
            res.status(403).end();   
        }
        else{
            if(doc.user_password == req.body.password){
                jwt.sign(
                    {
                        username : doc.user_aadhar_number,
                        type : doc.type
                    },
                    config.private,
                    {
                        expiresinMinutes : 60*24,
                        jwtid : '1'
                    },
                    function(token){
                        res.json({
                            authorisation : token 
                        });
                    }
                );
            }
            else{
                console.log('Password mismatch')
                res.status(403).end();
            }
        }
    });
}
