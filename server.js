// the requires
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

// create the express app
var app = express();

// bodyParser makes it easy for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// setup logging through morgan
app.use(logger('dev'));

// setup page loading in the static folder
app.use(express.static('public'));

//database configuration for mongoose
mongoose.connect('mongodb://rFm43mGuSn:DU7HjfNUQEhm@ds013918.mlab.com:13918/heroku_tj54dvff');
var db = mongoose.connection;

// connect to database
db.on('error', function (err) {
    console.log('Mongoose Error: ', err);
});
db.once('open', function () {
    console.log('Mongoose connection successful.');
});

// get the routing
require("./routes/routes.js")(app)

// start the server
var PORT = process.env.PORT || 8383;
app.listen(PORT, function(){
    console.log('Find the magic at port: ' + PORT);
});