const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true
  },
  course_name: {
    type: String,
    required: true
  },
  course_description: {
    type: String,
    required: true
  },
  course_department: {
    type: String,
    required: true
  },
  course_semester: {
    type: String,
    required: true
  },
  course_lecture: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  }],
  course_assignment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  course_quiz: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  course_notification: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification'
  }],
},{timestamps:true});

courseSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Course', courseSchema);