//use express dependancy for node work
var express = require('express');
var app = express();

//passport and session for authentication
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var expressSession = require('express-session');

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//use mongoose dependancy
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/beers");
var User = require("./public/js/models/UserModel");

//link routes
var userRoutes = require('./routes/userRoutes.js');
var beerRoutes = require('./routes/beerRoutes.js');

//use body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure passport/session
app.use(expressSession({
    secret: 'yourSecretHere',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//plm user model has local strategy, serial and deserialize
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

//server routes for beers and users
app.use('/beers', beerRoutes);
app.use('/users', userRoutes);

//catch all back to home when accessing non-existant route
app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
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
  res.send({
    message: err.message,
    error: err
  });
});

//declare port (heroku publication)
var port = process.env.PORT || 8080;

//start listening
app.listen(port, function () {
	console.log(port + " is listening");
});