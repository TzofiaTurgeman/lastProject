var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const path = require("path");
const fs = require("fs");

// connect
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "socialMedia",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

/* POST at login  */
router.post("/", function (req, res, next) {
  try {
    if (err) throw err;
    con.query(
      `SELECT password FROM users where username="${req.body.username}"`
    ),
      function (err, result, fields) {
        if (err) throw err;

        if (result.password === req.body.password) {
          res.status(200);
          return res.send({ isValid: true });
        } else {
          res.status(400);
          return res.send({ isValid: false });
        }
      };
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
});

/* POST users */
router.post("/add", function async(req, res) {
  console.log("Connected!");
  var sql = `INSERT INTO users (username, password, name1) VALUES ("${req.body.username}", "${req.body.password}", "${req.body.name1}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("works");
    return res.status(200).send("new user");
  });
});

// // delete user
// router.delete("/delete", function async(req, res) {
//   var sql = `delete FROM users WHERE id=${req.body.id}`;
//   console.log(res.body);
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     return res.status(200).send("user deleted / not exist ");
//   });
// });

module.exports = router;
