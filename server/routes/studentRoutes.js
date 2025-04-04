const express = require("express");
const router = express.Router();
const {
  studentSignIn,
  getStudentProfile,
  enrollInCourse,
  unenrollFromCourse,
  getEnrolledCourses,studentRefreshAccessToken,
} = require("../controllers/studentController");
const { verifyStudent } = require("../middlewares/authMiddleware");

router.post("/signin", studentSignIn);
router.get("/profile", verifyStudent, getStudentProfile);
router.post("/enroll", verifyStudent, enrollInCourse);
router.post("/unenroll", verifyStudent, unenrollFromCourse);
router.get("/courses", verifyStudent, getEnrolledCourses);
router.post("/refresh",studentRefreshAccessToken);

module.exports = router;