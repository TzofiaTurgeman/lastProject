var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const { title } = require("process");

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
  console.log('req: ', req.body);
  console.log("Connected!");
  var sql = `INSERT INTO todos (user_id, title, body, completed) VALUES ("${req.body.userId}", "${req.body.title}", "${req.body.body}", "${req.body.completed}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("works(todo)");
    return res.status(200).json({id: result.insertId, title: req.body.title,completed: req.body.completed});
  });
});

// delete todo
router.delete("/", function async(req, res) {
  var sql = `delete FROM todos WHERE id=${req.body.id}`;
  console.log(res.body);
  con.query(sql, function (err, result) {
    if (err) throw err;
    return res.status(200).json("todo deleted / not exist ");
  });
});

//update todo
router.patch("/update/:id", function async(req, res) {
  const { id } = req.params;
  var sql = `UPDATE todos SET ${req.body.key} = "${req.body.nval.completed}"  WHERE id=${id}`;
  console.log(res.body);
  try {
    con.query(sql, function (err, result) {
      if (err) throw err;
      return res.status(200).json("todos changed ");
    });
  } catch (error) {
    res.json("there is an error");
  }
});

module.exports = router;
