const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Student = require("../models/StudentModel");

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

const verifyStudent = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied! No valid token provided." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findOne({ _id: decoded.student_id });

    if (!student) {
      return res
        .status(403)
        .json({ message: "Access Denied! Not a valid student." });
    }

    req.student = student;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token!", error: error.message });
  }
};

module.exports = { verifyAdmin, verifyStudent };
