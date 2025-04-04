const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../models/StudentModel"); 

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

    // 🔍 Check if student exists
    const student = await Student.findOne({ student_uid });
    if (!student) {
      return res.status(400).json({ message: "Student not found!" });
    }

    // 🔐 Verify password
    const isMatch = await bcrypt.compare(student_password, student.student_password);
    console.log(student_password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid UID or password!" });
    }

    // 🔑 Generate tokens
    const accessToken = generateStudentAccessToken(student);
    const refreshToken = generateStudentRefreshToken(student);

    // 🍪 Store refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // ✅ Success response
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
    res.status(500).json({ message: "Error signing in student!", error: error.message });
  }
};
const getStudentProfile = async (req, res) => {
    try {
      // The student ID is attached to the request by the verifyStudent middleware
      const studentId = req.student_id;
  
      // Find the student in the database, excluding the password
      const student = await Student.findById(studentId)
        .select('-student_password') // Exclude password
        .populate('student_enrolled_courses', 'course_code course_name'); // Populate enrolled courses with basic info
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Return the student profile
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
          updatedAt: student.updatedAt
        }
      });
  
    } catch (error) {
      console.error("Error fetching student profile:", error);
      res.status(500).json({ message: "Error fetching student profile", error: error.message });
    }
  };
  
module.exports = { studentSignIn , getStudentProfile };
