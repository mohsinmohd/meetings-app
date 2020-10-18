const express = require('express');
const mainController = require('../controllers/main-controller');
const userController = require('../controllers/users-controller');
const meetingsController = require('../controllers/meetings-controller');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname + '/../../client')));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.listen('3000', () => {
    console.log("server started");
});

app.get('/', (req, res) => {
    res.render('../src/views/index');
});

app.get('/login', (req, res) => {
    res.render('../src/views/login');
});

app.get('/signUp', (req, res) => {
    res.render('../src/views/signUp');
});

app.get('/createMeeting', (req, res) => {
    res.render('../src/views/createMeeting');
});

app.get('/editMeeting/:id', (req, res) => {
    meetingsController.getMeeting(req.params.id, res);
});

app.get('/VEDMeeting', (req, res) => {
    meetingsController.getAllmeetings(req.params.userId, res);
});

app.get('/getUsers', (req, res) => {
    userController.getAllUsers();
    res.send("Database created")
});


app.post('/signUp', (req, res) => {
    userController.signUp(req.body, res);
});

app.get('/signIn', (req, res) => {
    userController.signIn(req.query, res);
});

app.get('/meetings/:userId', (req, res) => {
    meetingsController.getAllmeetings(req.params.userId);
});

app.get('/meetings/:id', (req, res) => {
    meetingsController.getMeeting(req.params.id);
});

app.post('/meetings', (req, res) => {
    meetingsController.createMeeting(req.body, res);
});

app.put('/meetings', (req, res) => {
    meetingsController.updateMeeting(req.body, res);
});

app.delete('/meetings/:id', (req, res) => {
    meetingsController.deleteMeeting(req.params.id, res);
});

module.exports.routes = app;