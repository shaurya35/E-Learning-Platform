const express = require("express");
const {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllLectures,
} = require("../controllers/courseControllers");

const router = express.Router();

const { verifyAdmin,verifyFaculty ,checkRole} = require("../middlewares/authMiddleware");

// Routes
router.post("/add", checkRole, addCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", checkRole, updateCourse);
router.delete("/:id", checkRole, deleteCourse);
router.get("/getAllLectures/:course_id", getAllLectures);

module.exports = router;
