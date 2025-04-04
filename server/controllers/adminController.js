require("dotenv").config();
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/StudentModel");
const Faculty = require("../models/facultyModel");

const generateAccessToken = (admin) => {
  return jwt.sign(
    { admin_id: admin.admin_id, email: admin.admin_email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

const generateRefreshToken = (admin) => {
  return jwt.sign(
    { admin_id: admin.admin_id, email: admin.admin_email, role: "admin" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
};

const signin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;

    // 🔍 Check if admin exists
    const admin = await Admin.findOne({ admin_email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found!" });
    }

    // 🔐 Verify password
    const isMatch = await bcrypt.compare(admin_password, admin.admin_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // 🔑 Generate JWT tokens
    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    // 🍪 Store refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // ✅ Send response
    res.status(200).json({
      message: "Signin successful!",
      accessToken,
      user: {
        email: admin.admin_email,
        admin_id: admin.admin_id,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    res
      .status(500)
      .json({ message: "Error signing in!", error: error.message });
  }
};

const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({
      admin_id: decoded.admin_id,
      email: decoded.email,
      role: decoded.role,
    });

    res.status(200).json({
      accessToken: newAccessToken,
      user: {
        email: decoded.email,
        admin_id: decoded.admin_id,
        role: decoded.role,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

const signup = async (req, res) => {
  try {
    const { admin_id, admin_email, admin_name, admin_password, admin_phone } =
      req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ admin_email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(admin_password, 10);

    // Create new admin
    const newAdmin = new Admin({
      admin_id,
      admin_email,
      admin_name,
      admin_password: hashedPassword,
      admin_phone,
    });

    await newAdmin.save();

    // Generate token
    const token = jwt.sign(
      { admin_id: newAdmin.admin_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Admin created successfully!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error signing up!", error: error.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const {
      student_uid, // Get UID from request body
      student_name,
      student_email,
      student_password,
      student_department,
      student_degree,
      student_semester,
      student_enrolled_courses,
    } = req.body;

    // Ensure UID is provided
    if (!student_uid) {
      return res.status(400).json({ message: "Student UID is required!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(student_password, 10);

    // Create new student
    const newStudent = new Student({
      student_uid, // Directly using the provided UID
      student_name,
      student_email,
      student_password: hashedPassword,
      student_department,
      student_degree,
      student_semester,
      student_enrolled_courses,
    });

    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student added successfully!", student: newStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding student!", error: error.message });
  }
};

const adminProfile = async (req, res) => {
  try {
    const admin = await Admin.findOne({ admin_id: req.admin.admin_id }).select(
      "-admin_password"
    ); // Exclude password
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin details retrieved successfully", admin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admin details", error: error.message });
  }
};

const addTeacher = async (req, res) => {
  try {
    const {
      faculty_uid,
      faculty_name,
      faculty_email,
      faculty_password,
      faculty_department,
      faculty_qualifications,
      faculty_phone,
      faculty_dob,
      teacher_course,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(faculty_password, 10);

    // Create new faculty member
    const newFaculty = new Faculty({
      faculty_uid,
      faculty_name,
      faculty_email,
      faculty_password: hashedPassword,
      faculty_department,
      faculty_qualifications,
      faculty_phone,
      faculty_dob,
      teacher_course,
    });

    await newFaculty.save();
    res.status(201).json({
      message: "Faculty member added successfully!",
      faculty: newFaculty,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding faculty!", error: error.message });
  }
};
const logout = (req, res) => {
  try {
    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });

    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Error logging out!", error: error.message });
  }
};
module.exports = {
  signup,
  signin,
  addStudent,
  addTeacher,
  refreshAccessToken,
  adminProfile,
  logout,
};
