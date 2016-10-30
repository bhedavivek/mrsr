var express = require('express');
var router = express.Router();
router.route('')
    .all(function(req, res){
    res.status(404).send();
});
module.exports= router;