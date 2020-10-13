const meetingDao = require('../daos/meeting-dao');

module.exports.getAllmeetings = (userId) => {
    meetingDao.getAllmeetings(userId);
};

module.exports.getMeeting = (id) => {
    meetingDao.getMeeting(id);
};

module.exports.createMeeting = (req) => {
    const meeting = { Title: req.title, MeetingDate: req.meetingDate, UserId: req.userId};
    const attendees = req.attendees;
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

