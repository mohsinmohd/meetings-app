const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: "DemoMeetings"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports.dbConnection = connection;