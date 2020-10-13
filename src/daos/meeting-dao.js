const con = require('../utils/db-connection');

const getAllMeetings = () => {
    con.dbConnection.query('SELECT * FROM Meetings', (err,rows) => {
        if(err) throw err;

        console.log('Data received from Db:');
        console.log(rows);
    })
};

const createMeeting = (meeting, attendees) => {    
    con.dbConnection.query('INSERT INTO Meetings SET ?', Meeting, (err, res) => {
        if(err) throw err;
        console.log('Last insert ID:', res.insertId);
        
        let toBeSavedAttendees = [];
        attendees.forEach(attendee => {
            toBeSavedAttendees.push({ meetingID: res.insertId, email: attendee });
        });
        console.log(toBeSavedAttendees);

        con.dbConnection.query('INSERT INTO Attendees VALUES ?', [toBeSavedAttendees], (err, res) => {
            if(err) throw err;
            console.log('Attendees inserted');
        })
    })
};

const updateMeeting = (Meeting) => {    
    con.dbConnection.query(
        'UPDATE Meetings SET Title ? MeetingDate ? WHERE MeetingId ?', [meeting.title, meeting.meetingDate, meeting.meetingID],
        (err, result) => {
            if (err) throw err;
        
            console.log(`Changed ${result.changedRows} row(s)`);
            con.dbConnection.query(
                'DELETE FROM ATTENDEES WHERE MeetingId ?',  meeting.meetingID,
                (err, result) => {
                if (err) throw err;
                console.log("Delete Attendees");
                }
            )
            let toBeSavedAttendees = [];
            attendees.forEach(attendee => {
                toBeSavedAttendees.push({ meetingID: res.insertId, email: attendee });
            });
            console.log(toBeSavedAttendees);

            con.dbConnection.query('INSERT INTO Attendees VALUES ?', [toBeSavedAttendees], (err, res) => {
                if(err) throw err;
                console.log('Attendees inserted');
            })
        }
      );
};


const deleteMeeting = (id) => {
    con.dbConnection.query(
        'DELETE FROM Meetings WHERE MeetingId = ?', id, (err, result) => {
        if (err) throw err;
      
        console.log(`Deleted ${result.affectedRows} row(s)`);
        }
    );
};

const getMeeting = (id) => {    
    con.dbConnection.query(
        'SELECT * FROM Meetings WHERE MeetingId = ?', id, (err, res) => {
        if(err) throw err;
        console.log('Update meeting');
    })
};



module.exports.getAllMeetings = getAllMeetings;
module.exports.getMeeting = getMeeting;
module.exports.createMeeting =  createMeeting;
module.exports.deleteMeeting = deleteMeeting;
module.exports.updateMeeting = updateMeeting;


