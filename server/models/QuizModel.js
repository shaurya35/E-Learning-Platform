const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quiz_id: {
    type: String,
    required: true,
    unique: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  quiz_title: {
    type: String,
    required: true
  },
  quiz_description: {
    type: String,
    required: true
  },
},{timestamps:true});

quizSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Quiz', quizSchema);