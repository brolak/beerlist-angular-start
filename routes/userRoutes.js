var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require("../public/js/models/UserModel.js");

//route for showing all users
router.get('/', function (req, res, next) {
  User.find(function (error, users) {
    if (error) {
      console.error(error)
      return next(error);
    } 
    res.send(users);
  });
});

router.get('/currentuser', function(req, res) {
  if (req.user) {
    res.send(req.user.username)
  } else {
    res.send(null)
  }
});

//route for user registration
router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send(req.user.username);
    });
  });
});

//route for user login
router.post('/login', passport.authenticate('local'), function(req, res) {
  if (err) {
      console.log('Error logging in', err);
      return next(err);
  }
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user.username)
});

//route for user logout
router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});

module.exports = router;