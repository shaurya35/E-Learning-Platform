const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    assignment_id: {
      type: String,
      required: true,
      unique: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    assignment_title: {
      type: String,
      required: true,
    },
    assignment_description: {
      type: String,
      required: true,
    },
    assignment_dueDate: {
      type: Date,
      required: true,
    },
    assignment_marks: {
      type: Number,
      required: true,
    },
    pdf_url: {
      type: String, // Field for storing the PDF URL
      required: true,
    },
  },
  { timestamps: true }
);

assignmentSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Assignment", assignmentSchema);
