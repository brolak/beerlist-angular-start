//use express dependancy for node work
var express = require('express');
var app = express();

//use mongoose dependancy for mongoose work
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/beers");
var Beer = require("./public/js/models/BeerModel.js");

//use body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//declare port for heroku publication
var port = /*process.env.PORT ||*/ 8080;

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//find beers in database FOR TESTING
app.get('/beers', function (request, response, next) {
  Beer.find(function (error, beers) {
    if (error) {
      console.error(error)
      return next(error);
    } 
    response.send(beers);
  });
});

//post new beer to database
app.post('/beers', function(request, response, next) {
  Beer.create(request.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    }
  });
});

//add new rating for a beer
app.get('/beers/rating/:id', function(req, res, next) {
  Beer.findById(req.params.id/*, { $push : {rating : req.body}}, {new:true}*/,function(err, beer) {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.send(beer.rating);
    }
  });
//this function only finds the existing rating array
});

//path for beer delete request
app.delete('/beers/:id', function(req, res, next) {
  Beer.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Thank you for deleting beer "+req.params.id);
    }
  });
});

//path for beer add (PUT) request
app.put('/beers/:id', function(req, res, next) {
  Beer.findByIdAndUpdate(req.params.id, req.body, {new:true},function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

//start listening
app.listen(port, function () {
	console.log(port + " is listening");
});
