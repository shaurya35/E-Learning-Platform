const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    faculty_uid: {
      type: String,
      required: true,
    },
    faculty_name: {
      type: String,
      required: true,
    },
    faculty_email: {
      type: String,
      required: true,
      unique: true,
    },
    faculty_password: {
      type: String,
      required: true,
    },
    faculty_department: {
      type: String,
      required: true,
    },
    faculty_qualifications: {
      type: [String],
      required: true,
    },
    faculty_phone: {
      type: String,
      required: true,
      unique: true,
    },
    faculty_dob: {
      type: Date,
      required: true,
    },
    teacher_course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }
  },
  { timestamps: true }
);

const faculty = mongoose.model("faculty", facultySchema);
module.exports = faculty;
