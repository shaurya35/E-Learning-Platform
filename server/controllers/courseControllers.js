const Course = require("../models/CourseModel");
const { v4: uuidv4 } = require("uuid");

const addCourse = async (req, res) => {
  try {
    const {
      course_name,
      course_description,
      course_department,
      course_semester,
    } = req.body;

    // Get user info from the request (assuming you have authentication middleware)
    const uploaded_by = {
      user_id: req.user._id, // The authenticated user's ID
      user_type: req.user.role, // Assuming your user model has a 'role' field
    };

    const newCourse = new Course({
      course_id: uuidv4(),
      course_name,
      course_description,
      course_department,
      course_semester,
      uploaded_by, // Add the uploader information
    });

    await newCourse.save();
    res.status(201).json({
      message: "Course added successfully!",
      course: newCourse,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .select(
        "-course_lecture -course_assignment -course_quiz -course_notification"
      )
      .populate("uploaded_by.user_id", "name email") // Populate user details
      .sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .select(
        "-course_lecture -course_assignment -course_quiz -course_notification"
      )
      .populate("uploaded_by.user_id", "name email"); // Populate user details

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

//jiska hai vahi dekh ske
const getAllLectures = async (req, res) => {
  try {
    const { course_id } = req.params;
    const student_id = req.user.id; // Assuming req.user contains student details after authentication

    // Validate inputs
    if (!course_id) {
      return res.status(400).json({ message: "Course ID is required!" });
    }

    // Fetch the student from DB to check enrollment
    const student = await Student.findById(student_id);

    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }

    // Check if student is enrolled in the course
    if (!student.enrolled_courses.includes(course_id)) {
      return res
        .status(403)
        .json({ message: "You are not enrolled in this course!" });
    }

    // Fetch lectures for the enrolled course
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
