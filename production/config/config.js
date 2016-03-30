var fs = require('fs');
module.exports = {
    private : fs.readFileSync('./config/certificates/privatekey.pem'),
    certificate : fs.readFileSync('./config/certificates/certificate.pem'),
    database : {
        name : 'hospital',
        url : 'mongodb://localhost',
        port : '27017'
    }
}