var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

//use of the Mongoose module, in order to establish the connection with the server.
const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const Promotions = require('./models/promotions');

const Leader = require('./models/leaders');


const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

//establish the connection
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });//handle an error


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//authorization
function auth (req, res, next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) {//we don't have header 
      var err = new Error('You are not authenticated!');

      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
  }

  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');//the buffer enables you to split the value and then we also give the encoding of the buffer which is Base64 encoding here. So we will convert that to a buffer by splitting that into two parts (arrey of 2 elements)

  var user = auth[0];//extract the username
  var pass = auth[1];
  if (user == 'admin' && pass == 'password') {
      next(); // authorized (encoded)
  } 
  else { //error
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');      
      err.status = 401;
      next(err);
  }
}

app.use(auth);//authentication

app.use(express.static(path.join(__dirname, 'public')));//enables us to serve static data from the public folder

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
