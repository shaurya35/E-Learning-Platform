const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");

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

const signin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ admin_email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found!" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(admin_password, admin.admin_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate token
    const token = jwt.sign(
      { admin_id: admin.admin_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Signin successful!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error signing in!", error: error.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const {
      student_name,
      student_email,
      student_password,
      student_department,
      student_degree,
      student_semester,
      student_enrolled_courses,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(student_password, 10);

    // Create new student
    const newStudent = new Student({
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

module.exports = { signup, signin, addStudent };
