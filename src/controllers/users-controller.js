require('dotenv').config()
const userDao = require('../daos/user-dao');
const jwt = require('jsonwebtoken')

let refreshTokens = [];//TODO: Shift this to db

module.exports.getAllUsers = () => {
    userDao.getAllUsers();
};

module.exports.signUp = (req, res) => {
    const user = { username: req.username, email: req.email, password: req.password};
    userDao.signUp(user).then((data, err) => {
        if(data != undefined && typeof(data) == "string" && data.startsWith("User")){
            res.status(400).end(data);
        }
        res.status(200).end("Signup successful");
    });
}

module.exports.logout = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204);
}

module.exports.generateToken = (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
}

module.exports.signIn = (req, res) => {
    userDao.getUser(req.username).then((data, err) => {
        let user = data[0];
        if(user != undefined || user != null) {
            if(user.Password == req.password) {
                user = JSON.parse(JSON.stringify(user));
                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken)
                res.status(200).end(JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }))
            }
        }
        res.status(400).end('Login Failed');
    });
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}