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

module.exports.updateMeeting = (req, res) => {
    const meeting = { MeetingId: req.meetingId, Title: req.title, MeetingDate: req.meetingDate, UserId: req.userId};
    const attendees = req.attendees;
    meetingDao.updateMeeting(meeting, attendees).then((data) => {
        if(data == "sucess"){
            res.status(200).end('Update Success');
        }
        res.status(400).end('Update Failed');
    });
}

