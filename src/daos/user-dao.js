const { resolve } = require('path');
const con = require('../utils/db-connection');


const getAllUsers = () => {
    con.dbConnection.query('SELECT * FROM Users', (err,rows) => {
        if(err) throw err;

        console.log('Data received from Db:');
        console.log(rows);
    })
};

const signUp = (user) => {
    return new Promise((resolve) => {
        con.dbConnection.query('SELECT COUNT(*) as UserCount FROM Users WHERE Username = ? OR Email = ?', [user.username, user.email], (err, res) => {
            if(err) throw err;
            if(res[0].UserCount >= 1) {
                return resolve("User with username or email already exist");
            }
            con.dbConnection.query('INSERT INTO Users SET ?', user, (err, res) => {
                if(err) throw err;
                console.log('Last insert ID:', res.insertId);
                resolve(res.insertId);
            })
        })
    })
};

const getUser = (userName) => {
    return new Promise( resolve => {
        con.dbConnection.query('SELECT * FROM Users WHERE Username = ?', userName, (err, res) => {
            if(err) throw err;
            console.log("User exists");
            resolve(res);
        })
    });
}

module.exports.getAllUsers = getAllUsers;
module.exports.signUp = signUp;
module.exports.getUser = getUser;
