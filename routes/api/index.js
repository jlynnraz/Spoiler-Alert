const router = require("express").Router();
const movieRoutes = require("./movies-api-routes");
const postRoutes = require("./post-api-routes");

router.use("/movies", movieRoutes);
//router.use("/posts", postRoutes);

module.exports = router;
