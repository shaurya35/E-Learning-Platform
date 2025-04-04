const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../models/StudentModel");
const Course = require("../models/CourseModel");

const generateStudentAccessToken = (student) => {
  return jwt.sign(
    {
      student_id: student._id,
      student_uid: student.student_uid,
      role: "student",
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

const generateStudentRefreshToken = (student) => {
  return jwt.sign(
    {
      student_id: student._id,
      student_uid: student.student_uid,
      role: "student",
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
};

const studentSignIn = async (req, res) => {
  try {
    const { student_uid, student_password } = req.body;

    const student = await Student.findOne({ student_uid });
    if (!student) {
      return res.status(400).json({ message: "Student not found!" });
    }

    const isMatch = await bcrypt.compare(
      student_password,
      student.student_password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid UID or password!" });
    }

    const accessToken = generateStudentAccessToken(student);
    const refreshToken = generateStudentRefreshToken(student);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Student signin successful!",
      accessToken,
      user: {
        student_uid: student.student_uid,
        student_id: student._id,
        role: "student",
      },
    });
  } catch (error) {
    console.error("Student Signin Error:", error);
    res
      .status(500)
      .json({ message: "Error signing in student!", error: error.message });
  }
};

const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.student_id;

    const student = await Student.findById(studentId)
      .select("-student_password")
      .populate(
        "student_enrolled_courses",
        "course_id course_name course_description course_department course_semester"
      );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student profile retrieved successfully",
      profile: {
        student_uid: student.student_uid,
        student_name: student.student_name,
        student_email: student.student_email,
        student_department: student.student_department,
        student_degree: student.student_degree,
        student_semester: student.student_semester,
        student_enrolled_courses: student.student_enrolled_courses,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res
      .status(500)
      .json({
        message: "Error fetching student profile",
        error: error.message,
      });
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const { course_id } = req.body;
    const studentId = req.student_id;

    // Check if course exists
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if student is already enrolled
    const student = await Student.findById(studentId);
    if (student.student_enrolled_courses.includes(course_id)) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    // Add course to student's enrolled courses
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { student_enrolled_courses: course_id } },
      { new: true }
    ).populate(
      "student_enrolled_courses",
      "course_id course_name course_description"
    );

    // Add student to course's enrolled students (if your Course model has this field)
    await Course.findByIdAndUpdate(
      course_id,
      { $addToSet: { enrolled_students: studentId } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully enrolled in course",
      enrolled_courses: updatedStudent.student_enrolled_courses,
    });
  } catch (error) {
    console.error("Enrollment Error:", error);
    res
      .status(500)
      .json({ message: "Error enrolling in course", error: error.message });
  }
};

const unenrollFromCourse = async (req, res) => {
  try {
    const { course_id } = req.body;
    const studentId = req.student_id;

    // Remove course from student's enrolled courses
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $pull: { student_enrolled_courses: course_id } },
      { new: true }
    ).populate(
      "student_enrolled_courses",
      "course_id course_name course_description"
    );

    // Remove student from course's enrolled students (if your Course model has this field)
    await Course.findByIdAndUpdate(
      course_id,
      { $pull: { enrolled_students: studentId } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully unenrolled from course",
      enrolled_courses: updatedStudent.student_enrolled_courses,
    });
  } catch (error) {
    console.error("Unenrollment Error:", error);
    res
      .status(500)
      .json({ message: "Error unenrolling from course", error: error.message });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.student_id;

    const student = await Student.findById(studentId).populate(
      "student_enrolled_courses",
      "course_id course_name course_description course_department course_semester"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Enrolled courses retrieved successfully",
      enrolled_courses: student.student_enrolled_courses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res
      .status(500)
      .json({
        message: "Error fetching enrolled courses",
        error: error.message,
      });
  }
};

module.exports = {
  studentSignIn,
  getStudentProfile,
  enrollInCourse,
  unenrollFromCourse,
  getEnrolledCourses,
};
