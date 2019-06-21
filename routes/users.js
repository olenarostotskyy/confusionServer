var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//user post
router.post('/signup', (req, res, next) => {//allow to sighn up
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {//from the body, will first check to make sure that the user with that username doesn't exist within the system
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({err:err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

    router.post('/login', passport.authenticate('local'), (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'You are successfully logged in!'});
    });

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
