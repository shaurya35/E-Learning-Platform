const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_uid: { 
    type: String, 
    unique: true, 
    required: [true, 'Student UID is required'] 
  },
  student_name: { 
    type: String, 
    required: [true, 'Student name is required'] 
  },
  student_email: { 
    type: String, 
    unique: true, 
    required: [true, 'Email is required']
  },
  student_password: { 
    type: String, 
    required: [true, 'Password is required']
  },
  student_department: { 
    type: String, 
    required: [true, 'Department is required'] 
  },
  student_dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  student_enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' 
  }]
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;