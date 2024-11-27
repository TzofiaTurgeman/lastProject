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

/* POST posts */
router.post("/add", function async(req, res) {
  console.log("Connected!");
  var sql = `INSERT INTO posts (user_id, title, body) VALUES ("${req.body.user_id}", "${req.body.title}", "${req.body.body}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("works(post)");
    return res.status(200).send("new post");
  });
});

// delete post
router.delete("/delete", function async(req, res) {
  var sql = `delete FROM posts WHERE id=${req.body.id}`;
  console.log(res.body);
  con.query(sql, function (err, result) {
    if (err) throw err;
    return res.status(200).send("post deleted / not exist ");
  });
});

//update post
router.patch("/update", function async(req, res) {
  var sql = `UPDATE posts SET ${req.body.key} = "${req.body.nval}"  WHERE id=${req.body.id}`;
  console.log(res.body);
  try {
    con.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).send("posts changed ");
    });
  } catch (error) {
    res.send("there is an error");
  }
});

module.exports = router;
