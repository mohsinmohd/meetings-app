const express = require('express');
const userController = require('../controllers/users-controller');

const app = express();
app.use(express.json());

app.listen('3000', () => {
    console.log("server started");
});

app.get('/getUsers', (req, res) => {

    userController.getAllUsers();
    res.send("Database created")
});


app.post('/signUp', (req, res) => {
    userController.signUp(req.body);
    res.send("signUp successfull");
});


module.exports.routes = app;