var express = require('express')
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require("./models/UserModel");

mongoose.connect(process.env.CONNECTION_STRING /*|| 'mongodb://localhost/beers'*/);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure passport and session middleware
app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//link routes
var userRoutes = require('./routes/userRoutes.js');
var beerRoutes = require('./routes/beerRoutes.js');

//server routes for beers and users
app.use('/beers', beerRoutes);
app.use('/users', userRoutes);


app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

//declare port (heroku publication)
var port = process.env.PORT/* || 8080*/;

//start listening
app.listen(port, function () {
	console.log(port + " is listening");
});