const express = require('express');
const bodyParser = require('body-parser');

//using Express router
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')//the dishRouter.route means that by using this approach, we are declaring the endpoint at one single location. Whereby you can chain all get, PUT, POST, delete methods already do this dish router. 
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all the leaders');
})



leaderRouter.route('/:id')//the dishRouter.route means that by using this approach, we are declaring the endpoint at one single location. Whereby you can chain all get, PUT, POST, delete methods already do this dish router. 
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get( (req,res,next) => {
    res.end('Will send details of the leader: ' 
    + req.params.id +' to you!');
})

.post( (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders/'
  + req.params.id);
})

.put((req, res, next) => {
  res.write('Updating the leader: ' + req.params.id + '\n');
  res.end('Will update the leader: ' 
  + req.body.name + ' with details: ' + req.body.description);
})

.delete( (req, res, next) => {
    res.end('Deleting leader: '
    + req.params.id);
});

module.exports = leaderRouter;
