const Course = require("../models/CourseModel");
const Lecture = require("../models/LectureModel");
const { v4: uuidv4 } = require("uuid");

const addCourse = async (req, res) => {
  try {
    const {
      course_name,
      course_description,
      course_department,
      course_semester,
    } = req.body;

    const newCourse = new Course({
      course_id: uuidv4(), // ✅ Generates a unique ID
      course_name,
      course_description,
      course_department,
      course_semester,
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully!", course: newCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .select(
        "-course_lecture -course_assignment -course_quiz -course_notification"
      ) // Exclude unwanted fields
      .sort({ createdAt: -1 }); // Sort by latest created courses first

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select(
      "-course_lecture -course_assignment -course_quiz -course_notification"
    ); // Exclude unwanted fields

    if (!course) return res.status(404).json({ message: "Course not found!" });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found!" });

    res
      .status(200)
      .json({ message: "Course updated successfully!", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found!" });

    res.status(200).json({ message: "Course deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLectures = async (req, res) => {
  try {
    const { course_id } = req.params;
    console.log(course_id);

    // Validate course_id
    if (!course_id) {
      return res.status(400).json({ message: "Course ID is required!" });
    }

    // Fetch lectures for the given course_id
    const lectures = await Lecture.find({ course_id });

    // If no lectures are found
    if (!lectures || lectures.length === 0) {
      return res
        .status(404)
        .json({ message: "No lectures found for this course!" });
    }

    res.status(200).json(lectures);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllLectures,
};
