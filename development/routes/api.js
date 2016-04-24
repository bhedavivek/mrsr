var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isAuthenticated = require('../controllers/checkAuthenticationController');
var userController = require('../controllers/userController');
var decodeData = require('../controllers/decodeDataController');
var doctorController = require('../controllers/doctorController');

//AUTHENTICATE REQUESTS MADE TO API
//router.use(isAuthenticated);

//router.use(decodeData);

//API END POINTS

//Single User End Points
router.route('/user/profile')
    .get(userController.getProfile)
router.route('/user')
    .get(userController.get)
    .post(userController.post);
router.param('report_id', function(req, res, next, report_id){
   req.report_id = report_id;
   next(); 
});
router.route('/user/:report_id')
    .get(userController.get);
//Hospital Bulk Records End Points
router.route('/doctor')
    .get(doctorController.get);
router.route('/*')
    .all(function(req, res){
        res.status(403);
        res.end();
    });
module.exports = router;