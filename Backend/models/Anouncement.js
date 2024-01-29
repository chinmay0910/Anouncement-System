const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    AnouncementName: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    audio: {
        type: String,
        // required: true,
    },
    selectedCampuses: {
        type: [String], // Array of selected campuses
        required: true,
    },
    availableRooms: {
        type: [String], // Array of selected rooms
        required: true,
    },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
