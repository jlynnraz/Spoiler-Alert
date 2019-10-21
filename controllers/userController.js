const db = require("../models");

// Defining methods for the booksController
module.exports = {
    login: function (req, res) {
        console.log("login");
        db.User.findOne({ where: { username: req.body.username, password: req.body.password } })
        .then(function(user) {
            //console.log(user);
            req.login(user.dataValues, function(err){
                    if(err) throw err;
                    res.send(200).end();

                });
        });
        // passport.authenticate('local', { failureRedirect: '/login' });
        // res.redirect('/');
    },
    addUser: function (req, res) {
        db.User.create({ username: "test", password: "test", role: "admin" })
            .then(function (user) {
                // console.log(user.dataValues);
                // req.login(user.dataValues, function(err){
                //     if(err) throw err;
                // });
                console.log('test');

                res.send(200).end();
            });
    }

};

