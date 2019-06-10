const express = require('express');
const bodyParser = require('body-parser');

//using Express router
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')//the dishRouter.route means that by using this approach, we are declaring the endpoint at one single location. Whereby you can chain all get, PUT, POST, delete methods already do this dish router. 
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all the promotions');
})



promoRouter.route('/:id')//the dishRouter.route means that by using this approach, we are declaring the endpoint at one single location. Whereby you can chain all get, PUT, POST, delete methods already do this dish router. 
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get( (req,res,next) => {
    res.end('Will send details of the promotion: ' 
    + req.params.id +' to you!');
})

.post( (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotios/'
  + req.params.id);
})

.put((req, res, next) => {
  res.write('Updating the promotion: ' + req.params.id + '\n');
  res.end('Will update the promotion: ' 
  + req.body.name + ' with details: ' + req.body.description);
})

.delete( (req, res, next) => {
    res.end('Deleting promotion: '
    + req.params.id);
});

module.exports = promoRouter;
