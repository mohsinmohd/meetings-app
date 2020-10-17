const userDao = require('../daos/user-dao');

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

module.exports.signIn = (req, res) => {
    userDao.getUser(req.username).then((data, err) => {
        const user = data[0];
        if(user != undefined || user != null) {
            if(user.Password == req.password) {
                res.status(200).end('You have been logged in');
            }
        }
        res.status(400).end('Login Failed');
    });
}