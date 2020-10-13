const meetingDao = require('../daos/meeting-dao');

module.exports.getAllmeetings = () => {
    meetingDao.getAllmeetings();
};

module.exports.getMeeting = (id) => {
    meetingDao.getAllmeetings();
};

module.exports.createMeeting = (req) => {
    const meeting = { meetingName: req.meetingname, Email: req.email, Password: req.password};
    meetingDao.signUp(meeting);
}

module.exports.deleteMeeting = (req) => {
    const meeting = { meetingName: req.meetingname, Email: req.email, Password: req.password};
    meetingDao.signUp(meeting);
}

module.exports.updateMeeting = (req) => {
    const meeting = { meetingName: req.meetingname, Email: req.email, Password: req.password};
    meetingDao.signUp(meeting);
}

