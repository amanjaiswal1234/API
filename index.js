const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "EmployeeDB",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

const port = process.env.PORT || 3000;
app.listen(port,  (err) => {
  if (err == null) {
    console.log("Server is running at port 3000!");
  } else {
    console.log("some error! ");
  }
});

//app.post('/insert/employees/', (req, res)=> {
// const params = req.body
// console.log(params);   //Note that even you have not added primary key. it will add to last!

// mysqlConnection.query('INSERT INTO employee SET ?',[params] ,(err, rows, fields)=> {
//  if (!err){
// console.log(rows);
//     res.send(' Insert successfully');
// }
// else{
//      console.log(err);
//  }
//  })
//})

//Get all employees
app.get("/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM Employee ", (err, rows, fields) => {
    if (!err)
      //console.log(rows);
      res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Employee WHERE job_id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err)
        //console.log(rows);
        res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.delete("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM Employee WHERE job_id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err)
        //console.log(rows);
        res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

//Insert an employees
app.post("/employees/insert", (req, res) => {
  mysqlConnection.query(
    "INSERT INTO employee SET ?",
    [req.body],
    (err, rows, fields) => {
      if (!err)
        //console.log(rows);
        res.send("Insert successfully.");
      else console.log(err);
    }
  );
});

//Update an employees
app.put("/employees/update", (req, res) => {
  //const emp=req.body
  //const {job_id,company_id, state_id,}=req.body
  mysqlConnection.query(
    "UPDATE employee  SET ?  ",
    [req.body],
    (err, rows, fields) => {
      if (!err)
        //console.log(rows);
        res.send("Update successfully.");
      else console.log(err);
    }
  );
});

// pdf anf png upload

app.use(fileupload());

app.get("/upload", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/upload", function (req, res) {
  const file = req.files.pdf;
  file.mv(`./${file.name}`);

  console.log(file);
  res.status(200).send("Hello world");
});
