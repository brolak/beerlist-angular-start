//use express dependancy for node work
var express = require('express');
var app = express();

//use mongoose dependancy for mongoose work
var mongoose = require('mongoose');

//use body parser for request work
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//declare port for heroku publication
var port = /*process.env.PORT ||*/ 8080;

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//initialize some hardcoded beers
app.get('/beers', function (req, res, next) {
  res.json({beers: [
    { name: '512 IPA', style: 'IPA', image_url: 'http://bit.ly/1XtmB4d', abv: 5 },
    { name: '512 Pecan Porter', style: 'Porter', image_url: 'http://bit.ly/1Vk5xj4', abv: 4 }
  ]});
});

//start listening
app.listen(port, function () {
	console.log(port+" is listening");
});
