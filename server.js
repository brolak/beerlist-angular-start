//use express dependancy for node work
var express = require('express');
var app = express();

//use mongoose dependancy for mongoose work
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/beers");
var Beer = require("./BeerModel");

//use body parser for request work
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//declare port for heroku publication
var port = /*process.env.PORT ||*/ 8080;

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//find beers in database
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
app.post('/beers', function(req, res, next) {
  Beer.create(req.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(beer);
    }
  });
});

//delete function
app.delete('/beers/:id', function(req, res, next) {
  Beer.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("something worked?");
    }
  });
});

//start listening
app.listen(port, function () {
	console.log(port + " is listening");
});
