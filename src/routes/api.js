var express = require('express');
var request = require('request');
var router = express.Router();


router.get ('/greetings', function(req, res){
    console.log('inside routes api /greetings');

    res.send("Hi");
    var options = req.query;
    
})

router.get ('/projects', function (req, res) {
	console.log('inside routes api /projects');
	res.json ([ 
              {
                tag: 1,
                name : 'prj1sss',
                description: 'desc1'
              },
              {
                tag: 2,
                name : 'prj2sss',
                description: 'desc2'
              }

          ]);

});

module.exports = router;