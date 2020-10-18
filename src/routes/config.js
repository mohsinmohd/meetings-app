require('dotenv').config()
const express = require('express');
const userController = require('../controllers/users-controller');
const meetingsController = require('../controllers/meetings-controller');
const path = require('path');
const jwt = require('jsonwebtoken')

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

app.post('/token', (req, res) => {
    userController.generateToken(req, res);
})

app.post('/signUp', (req, res) => {
    userController.signUp(req.body, res);
});

app.get('/signIn', (req, res) => {
    userController.signIn(req.query, res);
});

app.get('/logout', (req, res) => {
    userController.logout(req, res);
})

app.get('/meetings/:userId', authenticateToken, (req, res) => {
    meetingsController.getAllmeetings(req.params.userId);
});

app.get('/meetings/:id', authenticateToken, (req, res) => {
    meetingsController.getMeeting(req.params.id);
});

app.post('/meetings', authenticateToken, (req, res) => {
    meetingsController.createMeeting(req.body, res);
});

app.put('/meetings', authenticateToken, (req, res) => {
    meetingsController.updateMeeting(req.body, res);
});

app.delete('/meetings/:id', authenticateToken, (req, res) => {
    meetingsController.deleteMeeting(req.params.id, res);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports.routes = app;