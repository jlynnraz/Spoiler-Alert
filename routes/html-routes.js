const router = require("express").Router();
// const moviesController = require("../controllers/spoilerController");
var path = require("path");
const pug = require('pug');
var axios = require('axios');
var db = require("../models")

module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    //res.sendFile(path.join(__dirname, "../views/html/index.html"));
    res.render('index', { user: req.user });
  });
  // routes added by matt
  app.get("/profilepage", function(req, res) {
    res.render('profilepage', { user: req.user });
  });
  app.get("/searchresults", function(req, res) {
    res.render('searchresults', { user: req.user });
  });
  app.get("/thespoils", function(req, res) {
    res.render('thespoils', { user: req.user });
  });
  app.get("/newuser", function(req, res) {
    res.render('newUser', { user: req.user });
  });

  app.post("/searchresults", function(req, res) {
    console.log(req.body.movieSearch)
    axios.get(`http://www.omdbapi.com/?apikey=79a1eb7f&s=${req.body.movieSearch}`).then(function(response){
      var movies = response.data.Search;
      res.render('searchresults', { movies: movies })
    }).catch(function(err){
      if(err) throw err
    })
    // res.render('searchresults', { user: req.user }).end();
  });

  app.get("/thespoils/:id", function(req, res) {
    axios.get(`http://www.omdbapi.com/?apikey=79a1eb7f&i=${req.params.id}`).then(function(response){
      console.log(response.data)
      var movieInfo = response.data;
      db.Movie.findOrCreate({
        where: {
          name: movieInfo.Title
        }, defaults:{ 
          name: movieInfo.Title,
          image_path: "",
        }}).spread(function(movie, created){
          return res.render('thespoils', { spoilsInfo: movie, movieInfo: movieInfo })
          console.log(created)
        })
    }).catch(function(err){
      if(err) throw err
    })
    // res.render(200).end();
  });

};