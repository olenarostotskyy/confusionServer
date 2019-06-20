var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//user post
router.post('/signup', (req, res, next) => {//allow to sighn up
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user != null) {//from the body, will first check to make sure that the user with that username doesn't exist within the system
      var err = new Error('User ' + req.body.username + ' already exists!');// null - already exists
      err.status = 403;
      next(err);
    }
    else {//user does not exist
      return User.create({//creat the user
        username: req.body.username,
        password: req.body.password});
    }
  })
  //return promise
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'Registration Successful!', user: user});
  }, (err) => next(err))
  .catch((err) => next(err));
});

//to login the user
router.post('/login', (req, res, next) => {
  if(!req.session.user) {
    var authHeader = req.headers.authorization;
    
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  
    var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
  
    //find user
    User.findOne({username: username})
    .then((user) => {
      if (user === null) {
        var err = new Error('User ' + username + ' does not exist!');
        err.status = 403;
        return next(err);
      }
      else if (user.password !== password) {
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        return next(err);
      }
      else if (user.username === username && user.password === password) {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!')
      }
    })
    .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
})

//router get method 
router.get('/logout', (req, res) => {//For logout you're simply logging out yourself from the system, so you don't need to supply any further information
  if (req.session) {
    req.session.destroy();//when you call the destroy method, the session is destroyed and the information is removed from the server side pertaining to this session.
    res.clearCookie('session-id');//asking to delete the quokie 
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
