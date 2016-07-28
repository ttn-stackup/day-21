var LocalStrategy = require("passport-local").Strategy;

module.exports = function (app, passport) {
    var authenticate = function (username, password, done) {
        var valid = false; //authenticate with credentials, not shown
        if (valid) {
            return done(null, username);
        }
        return done(null, false);
    };

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, authenticate));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        var userObject = {email: id}; // Construct user profile based on id
        done(null, userObject);
    });

};