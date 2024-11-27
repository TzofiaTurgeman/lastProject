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
    con.query(
      `SELECT id FROM users where username="${req.body.username}"`,
      function (err, userIds, fields) {
        if (err) throw err;
        const userId = userIds[0]?.id;
        console.log("userId: ", userId);
        if (!userId) return res.status(400).send({ isValid: false });

        console.log("userId: ", userId);

        con.query(
          `SELECT password FROM password where users_id=${userId}`,
          function (err, passwordOfUser, fields) {
            console.log("passwordOfUser: ", passwordOfUser);
            if (err) throw err;

            if (passwordOfUser[0].password === req.body.password) {
              // res.status(200);
              var sql = `SELECT * FROM users WHERE username="${req.body.username}"`;
              con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("works");
                return res.status(200).json(result);
              });
              // return res.send({ isValid: true,});
            } else {
              res.status(400);
              return res.send({ isValid: false });
            }
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
});

/* POST users */
router.post("/add", function async(req, res) {
  console.log("Connected!");
  var sql = `INSERT INTO users (username, name1) VALUES ("${req.body.username}", "${req.body.name1}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("works");
    return res.status(200).send("new user");
  });

  con.query(
    `SELECT id FROM users where username="${req.body.username}"`,
    function (err, userIds, fields) {
      if (err) throw err;
      const userId = userIds[0].id;
      console.log("userId: ", userId);

      var sql2 = `INSERT INTO password (users_id, password) VALUES ("${userId}", "${req.body.password}")`;
      con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("works add password");
        return res.status(200).send("add password for new user");
      });
    }
  );
});

/* GET all users */
router.get("/all", function async(req, res) {
  var sql = `SELECT * FROM users `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("works(post)");
    return res.status(200).send(result);
  });
});

/* GET my users */
router.get(`/all/:userid`, function async(req, res) {
    const { userid } = req.params;
    var sql = `SELECT * FROM users WHERE users.id=${userid} `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("works(post)");
      return res.status(200).send(result);
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
