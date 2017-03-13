//use express dependancy for node work
var express = require('express');
var app = express();

//use mongoose dependancy
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/beers");
var Beer = require("./public/js/models/BeerModel.js");

//use body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//declare port (heroku publication)
var port = /*process.env.PORT ||*/ 8080;

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//find all beers in database, used to rendering all
app.get('/beers', function (req, res, next) {
  Beer.find(function (error, beers) {
    if (error) {
      console.error(error)
      return next(error);
    } 
    res.send(beers);
  });
});

//post new beer to database
app.put('/beers', function(req, res, next) {
  Beer.create(req.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
    console.log(req.body);
    res.send(beer);
	}
  });
});

//path for beer delete request
app.delete('/beers/:id', function(req, res, next) {
  Beer.findByIdAndRemove(req.params.id, function(err,beer) {
    if (err) {
      console.error(err)
      return next(err);
    } 
    //res.send(beer);
  });
});

//add new rating for a beer to it's rating array
app.put('/rating/:id', function(req, res, next) {
  Beer.findOneAndUpdate({_id: req.params.id }, { $push: req.body },{new:true},function(err,beers) {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.send(beers);
  });
});


//path for updating the average of ratings, for when rating added
app.post('/rating/:id', function(req, res, next) {
  Beer.update({ _id: req.params.id}, req.body,{new:true},function(err) {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.send("we updated the average");
  });
});

//path for editing already existing beers
app.post('/beers/:id', function(req, res, next) {
  Beer.findOneAndUpdate({ _id: req.params.id },  {$set: req.body}, { new: true }, function(err, beer) {
    if (err) {
      console.error(err);
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
