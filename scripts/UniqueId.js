var crypto = require('crypto');
exports.generateReportId = function(){
    return crypto.randomBytes(24).toString('base64').replace(/\//g,'').replace(/\+/g,'').slice(0,10);
};