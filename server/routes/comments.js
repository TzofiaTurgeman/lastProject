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

/* GET comments */
router.get("/get/:postid", function async(req, res) {
  const { postid } = req.params;
  var sql = `SELECT * FROM comments WHERE comments.post_id=${postid}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("works(comments)");
    return res.status(200).send(result);
  });
});

/* POST comments */
router.post("/add", function async(req, res) {
  console.log("Connected!");
  var sql = `INSERT INTO comments (user_id, post_id, title, body) VALUES ("${req.body.userId}","${req.body.postId}", "${req.body.name}", "${req.body.body}")`;
  con.query(sql, function (err, result) {
    if (err) throw res.status(400).json({ message: ":(" });
    console.log("works(comment)");
    return res.status(200).json({ id: result.insertId });
  });
});

//delete comment
router.delete("/delete", function async(req, res) {
  var sql = `delete FROM comments WHERE id=${req.body.id}`;
  console.log(res.body);
  con.query(sql, function (err, result) {
    if (err) throw err;
    return res.status(200).send("comments deleted / not exist ");
  });
});

//update comment
router.patch("/update", function async(req, res) {
  var sql = `UPDATE comments SET ${req.body.key} = "${req.body.nval}"  WHERE id=${req.body.id}`;
  console.log(res.body);
  try {
    con.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).send("comments changed ");
    });
  } catch (error) {
    res.send("there is an error");
  }
});

module.exports = router;
