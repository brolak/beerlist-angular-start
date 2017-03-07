var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen(8000, function() {
  console.log("Fullstack project. Listening on 8000.")

});
