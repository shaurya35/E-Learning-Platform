const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    unique: true
  },
  student_name: {
    type: String,
    required: true
  },
  student_email: {
    type: String,
    required: true,
    unique: true
  },
  student_password: {
    type: String,
    required: true
  },
  student_department: {
    type: String,
    required: true
  },
  student_enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
},{timestamps:true});

studentSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Student', studentSchema);