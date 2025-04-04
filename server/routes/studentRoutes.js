const express = require("express");
const router = express.Router();
const {
  studentSignIn,
  getStudentProfile,
  enrollInCourse,
  unenrollFromCourse,
  getEnrolledCourses,
  studentRefreshAccessToken,
  studentLogout  // Added the logout function import
} = require("../controllers/studentController");
const { verifyStudent } = require("../middlewares/authMiddleware");

// Authentication routes
router.post("/signin", studentSignIn);
router.post("/refresh", studentRefreshAccessToken);
router.post("/logout", verifyStudent, studentLogout);  // Added logout route

// Profile routes
router.get("/profile", verifyStudent, getStudentProfile);

// Course management routes
router.post("/enroll", verifyStudent, enrollInCourse);
router.post("/unenroll", verifyStudent, unenrollFromCourse);
router.get("/courses", verifyStudent, getEnrolledCourses);

module.exports = router;