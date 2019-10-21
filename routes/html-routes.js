const router = require("express").Router();
// const moviesController = require("../controllers/spoilerController");
var path = require("path");
const pug = require('pug');

module.exports = function (app) {
    app.get("/", function (req, res) {
        // console.log(req);
        // res.render('index', { user: req.user });
        //console.log(app);
        console.log("testing...");
        res.render('index', { user: req.user });
    });

    // router.route("/test").get(moviesController.addUser);
  console.log("in routes/html-routes");
}