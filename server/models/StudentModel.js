const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    // required: true,
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
    required: true,
    enum:['Computer Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Chemical Engineering',
          'Aerospace Engineering',
          'Biomedical Engineering',
          'Industrial Engineering',
          'Computer Science',
          'Information Technology',
          'Software Engineering',
          'Data Science',
          'Artificial Intelligence',
          'Cybersecurity',],
  default :'Computer Engineering'
  },
  student_degree: {
    type: String,
    required: true,
    enum: ['Bachelor', 'Master', 'PhD', 'Diploma', 'Other'],
    default: 'Bachelor'
  },
  student_semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  student_enrolled_courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
} , { timestamps: true });

studentSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Student', studentSchema);