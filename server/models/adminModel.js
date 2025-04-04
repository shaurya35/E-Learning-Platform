const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid"); // Import UUID for unique admin_id

const adminSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        default: uuidv4, // Auto-generate unique ID
        unique: true,
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
