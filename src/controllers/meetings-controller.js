const meetingDao = require('../daos/meeting-dao');
const moment = require('moment');

module.exports.getAllmeetings = (userId) => {
    meetingDao.getAllmeetings(userId);
};

module.exports.getMeeting = (id) => {
    meetingDao.getMeeting(id);
};

module.exports.createMeeting = (req) => {
    const meetingDate = moment(req.meetingDate, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss');
    const meeting = { Title: req.title, MeetingDate: meetingDate, UserId: req.userId};
    let attendees = req.attendees;
    if(attendees == undefined)
    {
        attendees = [];
    }
    meetingDao.createMeeting(meeting, attendees);
}

module.exports.deleteMeeting = (id) => {
    meetingDao.deleteMeeting(id);
}

module.exports.updateMeeting = (req) => {
    const meeting = { MeetingId: req.meetingId, Title: req.title, MeetingDate: req.meetingDate, UserId: req.userId};
    const attendees = req.attendees;
    meetingDao.updateMeeting(meeting, attendees);
}

