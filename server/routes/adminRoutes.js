const express = require("express");
const {
  signup,
  signin,
  logout,
  addStudent,
  addTeacher,
  adminProfile,
  refreshAccessToken,
} = require("../controllers/adminController");

const { verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);  // Add this new route

// Admin protected routes
router.post("/addStudent", verifyAdmin, addStudent);
router.post("/addFaculty", verifyAdmin, addTeacher);
router.get("/profile", verifyAdmin, adminProfile);
router.post("/refresh", refreshAccessToken);

module.exports = router;