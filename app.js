var express = require("express");

var app = express();

app.use(express.static(__dirname + "/public"));
app.use("/bower_components", express.static(__dirname + "/bower_components"))

app.get("/api/films", function (req, res) {
    res.status(200).json([{
        film_id: 1,
        name: "Avengers"
    }, {
        film_id: 2,
        name: "Avengers 2"
    }])
});

app.get("/api/films/:fid", function (req, res) {
    res.status(200).json({
        film_id: 1,
        name: "Avengers",
        description: "abcde abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde"
    })
});

app.listen(3000, function () {
    console.info("App Server started on port 3000");
});
