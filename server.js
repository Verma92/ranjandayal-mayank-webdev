/*
* Created by: Mayank
* To be run on node
* */

// adding express module to code sever side
var express = require('express');
var app = express();

// loading authentication modules
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// install, load, and configure body parser module

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// install, load, and configure body parser module
/*var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// adding configurations for client and server side
//require ("./test/app.js")(app);
require("./assignment/app")(app);

// configure port for running the project
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);