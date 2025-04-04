const Assignment = require("../models/AssignmentModel");
const Course = require("../models/courseModel"); // Import Course model
const { v4: uuidv4 } = require("uuid");

const addAssignment = async (req, res) => {
  try {
    const {
      course_id,
      assignment_title,
      assignment_description,
      assignment_dueDate,
      assignment_marks,
      pdf_url,
    } = req.body;

    if (
      !course_id ||
      !assignment_title ||
      !assignment_description ||
      !assignment_dueDate ||
      !assignment_marks ||
      !pdf_url
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the course exists
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Create new assignment
    const newAssignment = new Assignment({
      assignment_id: uuidv4(),
      course_id,
      assignment_title,
      assignment_description,
      assignment_dueDate,
      assignment_marks,
      pdf_url,
    });

    // Save assignment to DB
    const savedAssignment = await newAssignment.save();

    // Add the new assignment _id to course's course_assignment array
    course.course_assignment.push(savedAssignment._id);
    await course.save();

    res.status(201).json({
      message: "Assignment added successfully!",
      assignment: savedAssignment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { addAssignment };
