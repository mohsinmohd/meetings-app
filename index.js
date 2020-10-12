const mysql = require('mysql');
const express = require('express');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: "Meetings"
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();

app.listen('3000', () => {
    console.log("server started");
});

app.get('/createDb', (req, res) => {
    const createQuery = 'CREATE DATABASE Meetings'
    connection.query(createQuery, (err, result) => {
        if(err) {
            throw err;
        }
        console.log("Database created");
        res.send("Database created")
    });
});