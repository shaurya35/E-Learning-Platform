const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Faculty = require("../models/facultyModel");

const generateFacultyAccessToken = (student) => {
    return jwt.sign(
      {
        faculty_id: Faculty._id,
        faculty_uid: Faculty.faculty_uid,
        role: "faculty",
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
  };
  
  const generateFacultyRefreshToken = (faculty) => {
    return jwt.sign(
      {
        faculty_id: Faculty._id,
        faculty_uid: Faculty.faculty_uid,
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
    const isMatch = await bcrypt.compare(faculty_password, faculty.faculty_password);
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
    res.status(500).json({ message: "Error signing in faculty!", error: error.message });
  }
};

module.exports = { facultySignIn };
