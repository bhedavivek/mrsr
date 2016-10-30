var crypto = require('crypto');
module.exports = function(str){
    var hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');   
};