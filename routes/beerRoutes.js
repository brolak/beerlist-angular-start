var express = require('express');
var router = express.Router();
var Beer = require("../public/js/models/BeerModel.js");


var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send(401, { message: "Unauthorized" });
  }
};

//find all beers in database, used to rendering all
router.get('/', function (req, res, next) {
  Beer.find(function (error, beers) {
    if (error) {
      console.error(error)
      return next(error);
    } 
    res.send(beers);
  });
});

//find one beer in database
router.get('/:id', function (req, res, next) {
  Beer.findById(req.params.id, function (error, beer) {
    if (error) {
      console.error(error)
      return next(error);
    } 
    res.json(beer);
    console.log(beer);
  });
});

//post new beer to database
router.put('/', ensureAuthenticated, function(req, res, next) {
  Beer.create(req.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
    res.send(beer);
	}
  });
});

//path for beer delete request
router.delete('/:id', ensureAuthenticated, function(req, res, next) {
  Beer.findByIdAndRemove(req.params.id, function(err,beer) {
    if (err) {
      console.error(err)
      return next(err);
    } 
    res.send(beer._id);
  });
});

//add new rating for a beer to it's rating array
router.put('/:id/rating', ensureAuthenticated, function(req, res, next) {
  Beer.findOneAndUpdate({_id: req.params.id }, { $push: req.body },{new:true},function(err,beers) {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.send(req.params.id);
  });
});

//path for editing already existing beers
router.post('/:id/update', ensureAuthenticated, function(req, res, next) {
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
router.post('/:id/reviews', ensureAuthenticated, function(req, res, next) {
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
router.delete('/:beerid/reviews/:reviewid', ensureAuthenticated, function(req, res, next) {
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

module.exports = router;