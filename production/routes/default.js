var express = require('express');
var router = express.Router();
router.route('')
    .get(function(req, res){
    res.status(404).send();
});
module.exports= router;