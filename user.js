var mysql = require("mysql")

const FINDSQL = "select * from staff where email = ? and password = ?"
var pool = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "igdefault",
    database: "sakila",
    port: 3306
})

function User(id, firstname, lastname, email, gender, photo) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email
    this.gender = gender
    this.photo = photo
}

User.findOne = function(email, password, callback) {
    pool.getConnection(function(err, connection) {
        if(err) {
            console.log(err);
            return callback(err, null)
        }

        connection.query(FINDSQL, [email, password], function(err, results){
              if(err) {
                  console.log(err);
                  return callback(err, null)
              }

              callback(null, results);
        })
    })
}

module.exports = User
