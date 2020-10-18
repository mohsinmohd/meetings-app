const meetingDao = require('../daos/meeting-dao');
const moment = require('moment');

module.exports.getAllmeetings = (userId, res) => {
    userId = 1;
    meetingDao.getAllMeetings(userId).then((data, err) => {
        res.render('../src/views/meeting', {meetings: data, moment: moment});
    });
};

module.exports.getMeeting = (id, res) => {
    meetingDao.getMeeting(id).then((data) => {
        res.render('../src/views/editMeeting', {meeting: data, moment: moment});
    });
};

module.exports.createMeeting = (req, res) => {
    const meetingDate = moment(req.meetingDate, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss');
    const meeting = { Title: req.title, MeetingDate: meetingDate, UserId: req.userId};
    let attendees = parseAttendees(req.attendees);    
    meetingDao.createMeeting(meeting, attendees).then((data) => {
        if(data == "success"){
            res.status(200).end('Create Success');
        }
        res.status(400).end('Create Failed');
    });
}

module.exports.deleteMeeting = (id, res) => {
    meetingDao.deleteMeeting(id).then((data) => {
        if(data == "success"){
            res.status(200).end('Delete Success');
        }
        res.status(400).end('Delete Failed');
    });
}

module.exports.updateMeeting = (req, res) => {
    const meeting = { meetingId: req.meetingId, title: req.title, meetingDate: req.meetingDate, userId: req.userId};
    let attendees = parseAttendees(req.attendees);   
    meetingDao.updateMeeting(meeting, attendees).then((data) => {
        if(data == "success"){
            res.status(200).end('Update Success');
        }
        res.status(400).end('Update Failed');
    });
}

const parseAttendees = (attendees) => {
    if(attendees == undefined)
    {
        attendees = [];
    }
    attendees = attendees.split('|').map((attendee) => {
        return attendee.trim();
    });
    return attendees;
}