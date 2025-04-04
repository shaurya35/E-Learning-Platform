const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['classes', 'assignments', 'announcements'],
        required: true
    }
}, { timestamps: true }); 

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
