var express = require('express');
var router = express.Router();
var authenticateController = require('../controllers/authenticateController');
router.route('')
    .post(authenticateController.post);
module.exports= router;