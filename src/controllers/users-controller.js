const userDao = require('../daos/user-dao');

module.exports.getAllUsers = () => {
    userDao.getAllUsers();
};

module.exports.signUp = (req) => {
    const user = { UserName: req.username, Email: req.email, Password: req.password};
    userDao.signUp(user);
}
