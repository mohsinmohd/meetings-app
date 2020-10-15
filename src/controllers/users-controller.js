const userDao = require('../daos/user-dao');

module.exports.getAllUsers = () => {
    userDao.getAllUsers();
};

module.exports.signUp = (req) => {
    const user = { UserName: req.username, Email: req.email, Password: req.password};
    userDao.signUp(user);
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