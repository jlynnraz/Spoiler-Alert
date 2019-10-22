const router = require("express").Router();
// const moviesController = require("../controllers/spoilerController");
var path = require("path");
const pug = require('pug');
var axios = require('axios');

module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    //res.sendFile(path.join(__dirname, "../views/html/layout.html"));
    res.render('index', { user: req.user });
  });

  // cms route loads cms.html
  app.get("/posts", function(req, res) {
    //res.sendFile(path.join(__dirname, "../views/html/index.html"));
    res.render('index', { user: req.user });
  });

  app.post("/search", function(req, res) {
    //res.sendFile(path.join(__dirname, "../views/html/index.html"));
    console.log(req.body.movieSearch)
    axios.get(`http://www.omdbapi.com/?apikey=79a1eb7f&s=${req.body.movieSearch}`).then(function(response){
      // console.log(response.data.Search)
      var movies = response.data.Search;
      for (var i = 0; i < movies.length; i++){
        console.log(`Title: ${movies[i].Title} \n Year: ${movies[i].Year} \n imdbID: ${movies[i].imdbID} \n Poster: ${movies[i].Poster}\n`)
      }
    }).catch(function(err){
      if(err) throw err
    })

    // res.render(200).end();
  });

  // app.post("/movies/:id", function(req, res) {
  //   //res.sendFile(path.join(__dirname, "../views/html/index.html"));
  //   console.log(req.body.movieSearch)
  //   axios.get(`http://www.omdbapi.com/?apikey=79a1eb7f&t=${req.body.movieSearch}`).then(function(response){
  //    
  //   }).catch(function(err){
  //     if(err) throw err
  //   })

  //   // res.render(200).end();
  // });

};