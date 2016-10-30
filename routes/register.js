var router = require('express').Router();
var registrationController = require('../controllers/registrationController');
router.route('/')
    .post(registrationController.post);
    
module.exports = router;