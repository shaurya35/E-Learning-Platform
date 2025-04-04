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

const { verifyAdmin } = require("../middlewares/authMiddleware");
1
// Routes
router.post("/add", verifyAdmin, addCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", verifyAdmin, updateCourse);
router.delete("/:id", verifyAdmin, deleteCourse);
router.get("/getAllLectures/:course_id", getAllLectures);

module.exports = router;
