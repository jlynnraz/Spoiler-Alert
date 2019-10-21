const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

const htmlRoutes = require("./html-routes");

// API Routes]
router.use("/api", apiRoutes);
const moviesController = require("../controllers/spoilerController");
const userController = require("../controllers/userController");
router.route("/test").get(userController.addUser);


router.route("/login").post(userController.login);

// If no API routes are hit
router.use(function (req, res) {
  //console.log(req);
  res.render('index', { user: req.user });
});
// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });



module.exports = router;