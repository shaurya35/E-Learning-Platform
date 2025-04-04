const Assignment = require("../models/AssignmentModel");
const Course = require("../models/courseModel"); // Import Course model
const Lecture = require("../models/LectureModel");
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

const addLecture = async (req, res) => {
  try {
    const {
      course_id,
      lecture_title,
      lecture_description,
      lecture_date,
      video_url,
    } = req.body;

    if (
      !course_id ||
      !lecture_title ||
      !lecture_description ||
      !lecture_date ||
      !video_url
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the course exists
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Create new lecture
    const newLecture = new Lecture({
      lecture_id: uuidv4(),
      course_id,
      lecture_title,
      lecture_description,
      lecture_date,
      video_url,
    });

    // Save lecture to DB
    const savedLecture = await newLecture.save();

    // Add the new lecture _id to course's course_lecture array
    course.course_lecture.push(savedLecture._id);
    await course.save();

    res.status(201).json({
      message: "Lecture added successfully!",
      lecture: savedLecture,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { addAssignment, addLecture };
