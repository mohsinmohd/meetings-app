const express = require('express');
const userController = require('../controllers/users-controller');
const meetingsController = require('../controllers/meetings-controller');

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

app.get('/meetings/:userId', (req, res) => {
    meetingsController.getAllmeetings(req.params.userId);
    res.send("Database created")
});

app.get('/meetings/:id', (req, res) => {
    meetingsController.getMeeting(req.params.id);
    res.send("Database created")
});

app.post('/meetings', (req, res) => {
    meetingsController.createMeeting(req.body);
    res.send("Database created")
});


app.put('/meetings/:id', (req, res) => {
    meetingsController.updateMeeting(req.params.id);
    res.send("Database created")
});

app.delete('/meetings/:id', (req, res) => {
    meetingsController.deleteMeeting(req.params.id);
    res.send("Database created")
});

module.exports.routes = app;