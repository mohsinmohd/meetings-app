const con = require('../utils/db-connection');


const getAllUsers = () => {
    con.dbConnection.query('SELECT * FROM Users', (err,rows) => {
        if(err) throw err;

        console.log('Data received from Db:');
        console.log(rows);
    })
};

const signUp = (user) => {    
    con.dbConnection.query('INSERT INTO Users SET ?', user, (err, res) => {
        if(err) throw err;
        console.log('Last insert ID:', res.insertId);
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
