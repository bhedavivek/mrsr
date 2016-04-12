var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isAuthenticated = require('../controllers/checkAuthenticationController');
var userController = require('../controllers/userController');
var decodeData = require('../controllers/decodeDataController');

//AUTHENTICATE REQUESTS MADE TO API
//router.use(isAuthenticated);

//router.use(decodeData);

//API END POINTS

//Single User End Points
router.route('/user')
    .get(userController.get)
    .post(userController.post);

//Hospital Bulk Records End Points
router.route('/reports')
    .get(function(req, res){
        res.status(901).json({'Success': true, 'Message':'Bulk Records need to be done'});
    });
router.route('')
    .all(function(req, res){
        res.status(403);
        res.end();
    });
module.exports = router;