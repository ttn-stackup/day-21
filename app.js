//Load express
var express = require("express");
//Create an instance of express application
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var passport = require("passport");
var session = require("express-session");

app.use(session({
    secret: "something-cryptic-should-go-here",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


require("./auth")(app, passport);
require("./routes")(app, passport);

app.listen(3000, function () {
    console.log("Listening on ", 3000)
});
