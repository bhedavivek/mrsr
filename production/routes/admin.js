var express = require('express');
var router = express.Router();
var isAuthenticated = require('../controllers/checkAuthenticationController');
var hasAccess = require('../scripts/AccessControl');
router.use(isAuthenticated);
router.route('/insert', function(req, res){
    
})
router.route('')
    .get(function(req, res){
    res.status(404).send();
});
module.exports= router;