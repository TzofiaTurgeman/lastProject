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

/* GET todos */
router.get("/get/:userid", function async(req, res) {
    const { userid } = req.params;
  var sql = `SELECT * FROM todos WHERE todos.user_id=${userid}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("works(todo)");
    return res.status(200).send(result);
  });
});

/* POST todos */
router.post("/add", function async(req, res) {
  console.log("Connected!");
  var sql = `INSERT INTO todos (user_id, title, body, completed) VALUES ("${req.body.user_id}", "${req.body.title}", "${req.body.body}", "${req.body.completed}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("works(todo)");
    return res.status(200).send("new todo");
  });
});

// delete todo
router.delete("/delete", function async(req, res) {
  var sql = `delete FROM todos WHERE id=${req.body.id}`;
  console.log(res.body);
  con.query(sql, function (err, result) {
    if (err) throw err;
    return res.status(200).send("todo deleted / not exist ");
  });
});

//update todo
router.patch("/update", function async(req, res) {
  var sql = `UPDATE todos SET ${req.body.key} = "${req.body.nval}"  WHERE id=${req.body.id}`;
  console.log(res.body);
  try {
    con.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).send("todos changed ");
    });
  } catch (error) {
    res.send("there is an error");
  }
});

module.exports = router;
