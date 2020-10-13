const express = require('express');

const app = express();

app.listen('3000', () => {
    console.log("server started");
});

app.get('/createDb', (req, res) => {
    res.send("Database created")
});

module.exports.routes = app;