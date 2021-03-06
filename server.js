// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
var express = require("express");

// Passport login
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var session = require('express-session');
const pug = require('pug')
process.env.NODE_ENV="production"
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// const compiledFunction = pug.compileFile("layout.pug");
// Requiring our models for syncing
var db = require("./models");

passport.use(new Strategy(
  function (_username, _password, cb) {
    db.User.findOne({ where: { username: _username } }, function (err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != _password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

// Initialize Passport and restore authentication state, if any, from the session.
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'pug');

// Static directory
app.use(express.static("client/public"));

// Routes
// =============================================================
require("./routes/html-routes")(app);
// // require("./routes/api/movies-api-routes")(app);
require("./routes/api/post-api-routes")(app);
require("./routes/api/user-api-routes")(app);

// require("./routes")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
// force: true 