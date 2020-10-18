const { resolve } = require('path');
const con = require('../utils/db-connection');

const getAllMeetings = (userId) => {
    return new Promise((resolve) => {
        con.dbConnection.query('SELECT mtg.*, GROUP_CONCAT(atn.email SEPARATOR "|") as attendees FROM demomeetings.meetings mtg left join demomeetings.attendees atn on mtg.meetingid = atn.meetingId where mtg.userId = ? group by atn.meetingId', userId, (err,rows) => {
            if(err) throw err;
    
            console.log('Meetings received from Db:');
            console.log(rows);
            resolve(rows);
        })
    })
};

const createMeeting = (meeting, attendees) => {
    return new Promise((resolve) => {
        con.dbConnection.query('INSERT INTO Meetings SET ?', meeting, (err, res) => {
            if(err) throw err;
            console.log('Last insert ID:', res.insertId);
            
            const toBeSavedAttendees = parseAttendees(res.insertId, attendees);  
    
            if(toBeSavedAttendees.length > 0) {
                con.dbConnection.query('INSERT INTO Attendees (MeetingId, Email) VALUES ?', [toBeSavedAttendees], (err, res) => {
                    if(err) throw err;
                    console.log('Attendees inserted');
                    resolve("success");
                })
            }
        })
    })    
};

const updateMeeting = (meeting, attendees) => {    
    return new Promise((resolve) => {
        con.dbConnection.query(
            'UPDATE Meetings SET Title = ?, MeetingDate = ? WHERE MeetingId = ?', [meeting.title, meeting.meetingDate, meeting.meetingId],
            (err, result) => {
                if (err) throw err;
            
                console.log(`Changed ${result.changedRows} row(s)`);
                con.dbConnection.query(
                    'DELETE FROM ATTENDEES WHERE MeetingId = ?',  meeting.meetingId,
                    (err, result) => {
                        if (err) throw err;
                        console.log("Delete Attendees");
                        const toBeSavedAttendees = parseAttendees(meeting.meetingId, attendees);            
                        con.dbConnection.query('INSERT INTO Attendees (MeetingId, Email) VALUES ?', [toBeSavedAttendees], (err, res) => {
                            if(err) throw err;
                            console.log('Attendees inserted');
                            resolve("success");
                        });
                    }
                )
                
            }
          )
    })
};


const deleteMeeting = (id) => {
    return new Promise((resolve) => {
        con.dbConnection.query('DELETE FROM Attendees WHERE MeetingId = ?', id, (err, result) => {
            if(err) throw err;
            con.dbConnection.query(
                'DELETE FROM Meetings WHERE MeetingId = ?', id, (err, result) => {
                    if (err) throw err;            
                    console.log(`Deleted ${result.affectedRows} row(s)`);
                    resolve("success");
                }
            );
        })
        
    })
};

const getMeeting = (id) => {
    return new Promise((resolve) => {
        con.dbConnection.query(
            'SELECT mtg.*, GROUP_CONCAT(atn.email SEPARATOR "|") as attendees FROM demomeetings.meetings mtg LEFT JOIN demomeetings.attendees atn on mtg.meetingid = atn.meetingId WHERE mtg.MeetingId = ? group by atn.meetingId', id, (err, res) => {
            if(err) throw err;
            resolve(res[0]);
        })
    })
};

const parseAttendees = (meetingId, attendees) => {
    let toBeSavedAttendees = [];
    attendees.forEach(attendee => {
        toBeSavedAttendees.push([meetingId, attendee]);
    });
    console.log(toBeSavedAttendees);
    return toBeSavedAttendees;
}


module.exports.getAllMeetings = getAllMeetings;
module.exports.getMeeting = getMeeting;
module.exports.createMeeting =  createMeeting;
module.exports.deleteMeeting = deleteMeeting;
module.exports.updateMeeting = updateMeeting;


