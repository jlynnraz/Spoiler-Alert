//search for a movie, api calls (get)

const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.profile)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;

/*
html view
/users
    / (findAll) admin
/profile (profile)
/register (create)

/api/users
    /edit ()
/api/users/:id

*/