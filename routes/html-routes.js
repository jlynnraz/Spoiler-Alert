const router = require("express").Router();
// const moviesController = require("../controllers/spoilerController");
var path = require("path");
const pug = require('pug');
var axios = require('axios');
var db = require("../models")

module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get("/", function (req, res) {
        //res.sendFile(path.join(__dirname, "../views/html/index.html"));
        res.render('index', { user: req.user });
    });
    // routes added by matt

    app.get("/profilepage", function (req, res) {
        res.render('profilepage', { user: req.user });
    });
    app.get("/searchresults", function (req, res) {
        res.render('searchresults', { user: req.user });
    });
    app.get("/thespoils", function (req, res) {
        res.render('thespoils', { user: req.user });
    });
    app.get("/newuser", function (req, res) {
        res.render('newUser', { user: req.user });
    });

    // routes added by Nick
    app.get("/register", function (req, res) {
        res.render('register');
    });

    app.get("/login", function (req, res) {
        res.render('login');
    });

    app.get("/profile", function (req, res) {
        if (!req.user) {
            return res.redirect('/login');
        }
        db.User.findOne({
            where: {
                id: req.user.id
            },
            include: [{
                model: db.Post,
                include: [db.Movie]
            },
            db.Movie
            ]
        }).then(function (result) {
            const spoiledMovies = result.Posts.map(post => post.Movie.name);
            res.render('profilepage', {
                username: req.user.username,
                movies: result.Movies,
                spoiledMovies: spoiledMovies
            });
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post("/searchresults", function (req, res) {
        console.log(req.body.movieSearch)
        axios.get(`http://www.omdbapi.com/?apikey=79a1eb7f&s=${req.body.movieSearch}`).then(function (response) {
            var movies = response.data.Search;
            res.render('searchresults', { movies: movies })
        }).catch(function (err) {
            if (err) throw err
        })
        // res.render('searchresults', { user: req.user }).end();
    });

    app.get("/thespoils/:id", function (req, res) {
        axios.get(`http://www.omdbapi.com/?apikey=79a1eb7f&i=${req.params.id}`).then(function (response) {
            var movieInfo = response.data;
            db.Movie.findOrCreate({
                where: {
                    name: movieInfo.Title
                }, defaults: {
                    name: movieInfo.Title,
                    image_path: "",
                },
                include: [{
                    model: db.Post,
                    include: [db.User]
                }]
            }).spread(function (movie, created) {
                const data = { spoilsInfo: movie, movieInfo: movieInfo, user: req.user };
                // console.log(movie);
                return res.render('thespoils', data);
            })
        }).catch(function (err) {
            if (err) throw err
        })
        // res.render(200).end();
    });
};