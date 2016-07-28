var express = require("express");
var Film = require("./film");

module.exports = function (app) {
    app.get("/api/films", function (req, res) {
        Film.findAll()
            .then(function (films) {
                res.status(200).json(films);
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).end();
            })
    });


    app.get("/api/films/:filmId", function (req, res) {
        Film.findOne([req.params.filmId])
            .then(function (film) {
                res.status(200).json(film[0]);
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).end();
            })
    });

    app.use(express.static(__dirname + "/public"));
    app.use("/bower_components", express.static(__dirname + "/bower_components"));
};