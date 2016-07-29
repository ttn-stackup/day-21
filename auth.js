var LocalStrategy = require("passport-local").Strategy;
var sha1 = require("sha1")

var User = require("./user.js")
//Setup local strategy
module.exports = function (app, passport) {
    function authenticate(username, password, done) {
        console.log("username", username);
        console.log("password", password);

        password = sha1(password) // encode password according to what DB has

        User.findOne(username, password, function(err, results) {
            if(err) {
                done(err, null)
            }

            var user = results[0]; // there should be only one such user
            if(user) {
                // User was found
                return done(null, user)
            }
            // otherwise return error
            done(err, null);
        })
    }

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, authenticate));

    passport.serializeUser(function (user, done) {
        done(null, user)
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

};
