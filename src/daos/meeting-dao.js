const con = require('../utils/db-connection');

const getAllMeetings = () => {
    con.dbConnection.query('SELECT * FROM Meetings', (err,rows) => {
        if(err) throw err;

        console.log('Data received from Db:');
        console.log(rows);
    })
};
const createMeeting = (Meeting) => {    
    con.dbConnection.query('INSERT INTO Meetings SET ?', Meeting, (err, res) => {
        if(err) throw err;
        console.log('Last insert ID:', res.insertId);
    })
};

const updateMeeting = (Meeting) => {    
    con.dbConnection.query('INSERT INTO Meetings SET ?', Meeting, (err, res) => {
        if(err) throw err;
        console.log('Last insert ID:', res.insertId);
    })
};


const deleteMeeting = (Meeting) => {    
    con.dbConnection.query('INSERT INTO Meetings SET ?', Meeting, (err, res) => {
        if(err) throw err;
        console.log('Last insert ID:', res.insertId);
    })
};

const getMeeting = (Meeting) => {    
    con.dbConnection.query('INSERT INTO Meetings SET ?', Meeting, (err, res) => {
        if(err) throw err;
        console.log('Last insert ID:', res.insertId);
    })
};

module.exports.getAllMeetings = getAllMeetings;
module.exports.getMeeting = getMeeting;
module.exports.createMeeting =  createMeeting;
module.exports.deleteMeeting = deleteMeeting;
module.exports.updateMeeting = updateMeeting;


