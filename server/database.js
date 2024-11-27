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

//create tables
const createTables = () => {
  let fileContent;
  let parsedFileContent;
  let stringForTableBuilding = "";

  let tablesArr = ["comments", "posts", "todos", "users", "password"];
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    for (let i = 0; i < tablesArr.length; i++) {
      stringForTableBuilding = "";
      fileContent = fs.readFileSync(`./entities/${tablesArr[i]}.json`);
      parsedFileContent = JSON.parse(fileContent);
      Object.keys(parsedFileContent).forEach((key) => {
        stringForTableBuilding += `${key} ${parsedFileContent[key]}, `;
      });
      stringForTableBuilding = stringForTableBuilding.slice(0, -2);

      const sql = `CREATE TABLE IF NOT EXISTS ${tablesArr[i]} (${stringForTableBuilding})`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Table ${tablesArr[i]} created`);
      });
    }
  });
};

createTables();
