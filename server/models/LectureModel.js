const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  lecture_id: {
    type: String,
    required: true,
    unique: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lecture_title: {
    type: String,
    required: true
  },
  lecture_description: {
    type: String,
    required: true
  },
  lecture_date: {
    type: Date,
    required: true
  },
  lecture_materials: [{
    name: String,
    url: String
  }],
},{timestamps:true});

lectureSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Lecture', lectureSchema);