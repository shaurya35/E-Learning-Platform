const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        unique: true,
        required: true
    },
    admin_email: {
        type: String,
        required: true,
        unique: true
    },
    admin_name: {
        type: String,
        required: true
    },
    admin_password: {
        type: String,
        required: true
    },
    admin_phone: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true }); 

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
