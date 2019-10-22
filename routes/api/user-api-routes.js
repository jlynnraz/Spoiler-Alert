var db = require("../../models");

module.exports = function (app) {
  app.post("/api/users/register", function (req, res) {

    db.User.create({ username: req.body.username, password: req.body.password, role: "admin" })
      .then(function (results) {
        req.login(results.dataValues, function (err) {
          if (err) throw err;
          res.send(200).end();
        });
      })
  });
  app.post("/api/users/login", function (req, res) {

    db.User.findOne({ where: { username: req.body.username, password: req.body.password} })
      .then(function (results) {
        if (!results) {
          return res.send(404).end();
        }
        req.login(results.dataValues, function (err) {
         if (err) throw err;
          res.send(200).end();
        });
      })
  })
}