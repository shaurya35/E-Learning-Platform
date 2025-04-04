const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    course_id: {
      type: String,
      required: true,
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
    uploaded_by: {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      user_type: {
        type: String,
        enum: ["admin", "faculty"],
        required: true,
      },
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
const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

module.exports = Course;
