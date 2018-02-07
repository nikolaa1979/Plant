var express = require('express');
var request = require('request');
var router = express.Router();


router.get ('/greetings', function(req, res){
    console.log('inside routes api /greetings');

    res.send("Hi");
    var options = req.query;
    
})

module.exports = router;