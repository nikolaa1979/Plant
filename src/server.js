var favicon = require('serve-favicon');
var api = require('./routes/api');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var request = require ('request')
var Promise = require ('bluebird')

var app = express();

app.set('port', process.env.PORT || 3000);
//app.set('views', './server/views');
// app.set('view engine', 'pug');


// ClientID=om5IVYcQW9ZchphEJarPiFjxkF9Aulq9
// Client Secret= SWGqUGH4WA6vJewo

app.use(session(
{
  secret: 'ourSecret',
  resave: false,  
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/client/public'));


// use body parser
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));

// echo request
app.use(function(req, res, next) {
  console.log (req.method + ' ' + req.url + ' sesid=' + req.sessionID);
  next ();
});




app.get('/', restrict, function (req, res) {
	console.log ("index " + __dirname);
	res.sendFile('./client/views/index2.html', {root: __dirname })
	//res.render('index');
});


//app.use('/', router);

//app.use(favicon(__dirname + './www/images/favicon.ico'));

// Use this route for proxying access token requests
app.use('/api', api);

app.get('/oauth', function(req, res) {
  console.log ("oauth we are in '" + req.query.code + "'")
  if (req.query.code !== undefined) {
    authorizeSession (req, res)
  } else {
     res.redirect ('/');
  }
});





var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});


// restrict and authorization
//
function restrict(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
  	var url = 'https://developer.api.autodesk.com/authentication/v1/authorize?response_type=code&client_id=om5IVYcQW9ZchphEJarPiFjxkF9Aulq9&redirect_uri=http%3A%2F%2Flocalhost:3000/oauth&scope=data:read'
    res.redirect(url);
  }
}

function authorizeSession (req, res) {
  req.session.authenticated = true;
  req.session.authcode = req.query.code;

  getAccessToken (req.session.authcode).then (function (token) {
    req.session.token = token;
    console.log  ('accesstoke= ' + req.session.token.access_token)
    getUserInfo (token.access_token).then (function (userdata) {
      req.session.userinfo = userdata;
      res.redirect ('/');
    });
  });
  
 }

 // ClientID=om5IVYcQW9ZchphEJarPiFjxkF9Aulq9
// Client Secret= SWGqUGH4WA6vJewo

 function getAccessToken(authcode) {
 
  var options = {
    method: 'POST',
    url: 'https://developer.api.autodesk.com/authentication/v1/gettoken',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body : 'client_id=om5IVYcQW9ZchphEJarPiFjxkF9Aulq9&client_secret=SWGqUGH4WA6vJewo&grant_type=authorization_code&redirect_uri=http://localhost:3000/oauth&code=' + authcode
  };

  return new Promise(function (resolve, reject) {
    request.post(options, function (err, data, body) {
      if (err) { return reject(err); }
      
      response = JSON.parse (body);
      resolve(response);
    });
  });
}

// promises user info
function getUserInfo (token) {
  var options =  {
      method: 'GET',
      url: 'https://developer.api.autodesk.com/userprofile/v1/users/@me',
      headers: { 'Authorization': 'Bearer ' + token}
  }; 


  return new Promise(function (resolve, reject) {
    request.get(options, function (err, data, body) {
      if (err) { 
        return reject(err); 
      }
      
      response = JSON.parse (body);
      resolve(response);
    });
  });

}

