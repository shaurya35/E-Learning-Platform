const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Faculty = require("../models/facultyModel");

const generateFacultyAccessToken = (faculty) => {
  return jwt.sign(
    {
      faculty_id: faculty._id,
      faculty_uid: faculty.faculty_uid,
      role: "faculty",
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

const generateFacultyRefreshToken = (faculty) => {
  return jwt.sign(
    {
      faculty_id: faculty._id,
      faculty_uid: faculty.faculty_uid,
      role: "faculty",
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
};
const facultySignIn = async (req, res) => {
  try {
    const { faculty_uid, faculty_password } = req.body;

    const faculty = await Faculty.findOne({ faculty_uid });
    if (!faculty) {
      return res.status(400).json({ message: "Faculty not found!" });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(
      faculty_password,
      faculty.faculty_password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid UID or password!" });
    }

    // 🔑 Generate tokens
    const accessToken = generateFacultyAccessToken(faculty);
    const refreshToken = generateFacultyRefreshToken(faculty);

    // 🍪 Store refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // ✅ Respond with tokens and basic info
    res.status(200).json({
      message: "Faculty signin successful!",
      accessToken,
      user: {
        faculty_uid: faculty.faculty_uid,
        faculty_id: faculty._id,
        role: "faculty",
      },
    });
  } catch (error) {
    console.error("Faculty Signin Error:", error);
    res
      .status(500)
      .json({ message: "Error signing in faculty!", error: error.message });
  }
};

const getFacultyProfile = async (req, res) => {
  try {
    // The faculty ID is attached to the request by the verifyFaculty middleware
    const facultyId = req.faculty_id;

    // Find the faculty in the database, excluding the password and populating courses
    const faculty = await Faculty.findById(facultyId)
      .select("-faculty_password") // Exclude password
      .populate("teacher_course", "course_code course_name credits"); // Populate course details

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Return the faculty profile
    res.status(200).json({
      message: "Faculty profile retrieved successfully",
      profile: {
        faculty_uid: faculty.faculty_uid,
        faculty_name: faculty.faculty_name,
        faculty_email: faculty.faculty_email,
        faculty_department: faculty.faculty_department,
        faculty_qualifications: faculty.faculty_qualifications,
        faculty_phone: faculty.faculty_phone,
        faculty_dob: faculty.faculty_dob,
        teacher_course: faculty.teacher_course,
        createdAt: faculty.createdAt,
        updatedAt: faculty.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).json({
      message: "Error fetching faculty profile",
      error: error.message,
    });
  }
};
const facultyRefreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateFacultyAccessToken({
      faculty_id: decoded.faculty_id,
      faculty_uid: decoded.faculty_uid,
      role: decoded.role,
    });

    res.status(200).json({
      accessToken: newAccessToken,
      user: {
        faculty_uid: decoded.faculty_uid,
        faculty_id: decoded.faculty_id,
        role: decoded.role,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

// Add to exports
module.exports = { 
  facultySignIn, 
  getFacultyProfile,
  facultyRefreshAccessToken 
};