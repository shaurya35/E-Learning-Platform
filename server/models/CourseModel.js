const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const courseSchema = new mongoose.Schema(
  {
    course_id: {
      type: String,
      default: uuidv4, // Generates a unique UUID automatically
      unique: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    course_description: {
      type: String,
      required: true,
    },
    course_department: {
      type: String,
      required: true,
    },
    course_semester: {
      type: String,
      required: true,
    },
    course_lecture: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    course_assignment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
    course_quiz: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    course_notification: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  { timestamps: true }
);

// ✅ Prevents OverwriteModelError
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

module.exports = Course;
