//search for a movie, api calls (get)

const router = require("express").Router();
const moviesController = require("../../controllers/spoilerController");

// Matches with "/api/books"
router.route("/")
  .get(moviesController.findAll)
  .post(moviesController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(moviesController.findById)
  .put(moviesController.update)
  .delete(moviesController.remove);

module.exports = router;
