const express = require("express");
const {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseControllers");

const router = express.Router();

const { verifyAdmin } = require("../middlewares/authMiddleware");

// Routes
router.post("/add", verifyAdmin, addCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", verifyAdmin, updateCourse);
router.delete("/:id", verifyAdmin, deleteCourse);

module.exports = router;
