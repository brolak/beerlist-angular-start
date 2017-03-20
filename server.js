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
  Beer.create(req.body, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
    res.send(req.body);
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
    res.send(beer._id);
  });
});

//add new rating for a beer to it's rating array
app.put('/beers/:id/rating', function(req, res, next) {
  Beer.findOneAndUpdate({_id: req.params.id }, { $push: req.body },{new:true},function(err,beers) {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.send(req.params.id);
  });
});

//path for editing already existing beers
app.post('/beers/:id/update', function(req, res, next) {
  Beer.findOneAndUpdate({ _id: req.params.id },  {$set: req.body}, { new: true }, function(err) {
    if (err) {
      console.error(err);
      return next(err);
    } else {
      res.send(req.body);
    }
  });
});

//path for adding new beer review
app.post('/beers/:id/reviews', function(req, res, next) {
  Beer.findById(req.params.id, function(err, foundBeer) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (!foundBeer) {
      return res.send("Error! No beer found with that ID");
    } else {
      foundBeer.reviews.push(req.body)
      foundBeer.save(function(err, updatedBeer) {
        if (err) {
          return next(err);
        } else {
          res.send(updatedBeer);
        }
      });
    }
  });
});

//path for deleting a beer review
app.delete('/beers/:beerid/reviews/:reviewid', function(req, res, next) {
  Beer.findById(req.params.beerid, function(err, foundBeer) {
    if (err) {
      return next(err);
    } else if (!foundBeer) {
      return res.send("Error! No beer found with that ID");
    } else {
      var reviewToDelete = foundBeer.reviews.id(req.params.reviewid)
      if (reviewToDelete) {
        reviewToDelete.remove()
        foundBeer.save(function(err, updatedBeer) {
          if (err) {
            return next(err);
          } else {
            res.send(updatedBeer);
          }
        });
      } else {
        return res.send("Error! No review found with that ID");
      }
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
