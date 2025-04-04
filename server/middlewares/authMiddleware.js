const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Student = require("../models/StudentModel");
const Faculty = require("../models/facultyModel");

const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied! No valid token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ admin_id: decoded.admin_id });

    if (!admin) {
      return res.status(403).json({ message: "Access Denied! Not an admin." });
    }

    req.admin = admin;
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ message: "Invalid Token!", error: error.message });
  }
};

const verifyStudent = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Verify the role is student
    if (decoded.role !== "student") {
      return res
        .status(403)
        .json({ message: "Access forbidden - student role required" });
    }

    // Attach student information to the request
    req.student_id = decoded.student_id;
    req.student_uid = decoded.student_uid;
    req.role = decoded.role;

    next();
  });
};

const checkRole = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No valid token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    // Check if the role is faculty or admin
    if (decoded.role === "faculty" || decoded.role === "admin") {
      req.user = decoded; // Attach user info to request
      req.role = decoded.role; // Store role
      return next(); // Allow access
    }

    return res
      .status(403)
      .json({ message: "Access denied. Only Faculty or Admin allowed." });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token.", error: error.message });
  }
};

const verifyFaculty = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied! No valid token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const faculty = await Faculty.findOne({ faculty_uid: decoded.faculty_uid });

    if (!faculty) {
      return res
        .status(403)
        .json({ message: "Access Denied! Not a faculty member." });
    }

    req.faculty = faculty; // Attach faculty object to request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ message: "Invalid Token!", error: error.message });
  }
};

module.exports = { verifyAdmin, verifyStudent, verifyFaculty, checkRole };
