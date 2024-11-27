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
