//Load express
var express = require("express");
//Create an instance of express application
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var q = require('q');

var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "igdefault",
    database: "sakila",
    connectionLimit: 4
});


const findAllStmt = "select film_id, title, release_year from film";
const findOneStmt = "select * from film where film_id = ?";

var makeQuery = function (sql, pool) {
    return function (args) {

        var defer = q.defer();

        pool.getConnection(function (err, connection) {
            if (err) {
                return defer.reject(err);
            }
            connection.query(sql, args || [], function (err, result) {
                connection.release();
                if (err) {
                    return defer.reject(err);
                }
                defer.resolve(result);
            })
        });

        return defer.promise;
    };
};


var findAll = makeQuery(findAllStmt, pool);
var findOne = makeQuery(findOneStmt, pool);


app.get("/api/films", function (req, res) {
    findAll()
        .then(function (films) {
            res.status(200).json(films);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).end();
        })
});


app.get("/api/films/:filmId", function (req, res) {
    findOne([req.params.filmId, req.user.id])
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


app.listen(3000, function () {
    console.log("Listening on ", 3000)
});











