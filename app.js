//Load express
var express = require("express");
//Create an instance of express application
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("./routes")(app);

app.listen(3000, function () {
    console.log("Listening on ", 3000)
});











