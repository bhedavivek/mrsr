var jwt = require('jsonwebtoken');
var secret = require('../config/config').private;
module.exports=function(req, res, next){
    var token = req.headers['auth-token'];
    if(token){
        jwt.verify(token, secret, function(err, decoded){
           if(err){
               console.log(err);
               res.status(401);
               res.json({
                   success : false,
                   error : 'Authorisation token invalid'
               });
           }
           else{
               req.decoded = decoded;
               next();
           } 
        });
    }
    else{
        res.status(401);
        res.json({
            success : false,
            error : 'Authorisation token required'   
        });
    }
}