//post for blog
var db = require("../../models");

module.exports = function (app) {
    app.get("/api/posts", function (req, res) {
        var queryObj = req.body;
        if (req.query.name) {
            queryObj.UserId = req.query.name;
            db.Post.findAll({
                include: [db.name],
                where: queryObj
            }).then(function (dbPost) {
                res.json(dbPost);
            });
        };
        console.log("Hiii");
        res.json(queryObj)
    })


    app.get("/api/posts/:movies", function (req, res) {
        console.log(req.params.movies)
        db.Post.findOne({
            name: [db.name],
            where: {
                id: req.params.movies
            }
        }).then(function (dbPost) {
            console.log(dbPost);
            res.json(dbPost);
        });
    });

    app.post("/api/thespoils", function (req, res) {
        // console.log(req.body);
        db.Post.create(req.body).then(function (dbPost) {
            console.log(dbPost)
            res.json(dbPost);
        });
    })

    app.put("/thespoils/:id", function (req, res) {
        
        db.Post.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbPost) {
            res.json(dbPost)
        })
    })

    app.delete("api/thespoils/:id", function (req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
}
