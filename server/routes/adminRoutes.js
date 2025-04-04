const express = require("express");
const {
  signup,
  signin,
  addStudent,
  addTeacher,adminProfile
} = require("../controllers/adminController");

const { verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/addStudent", verifyAdmin, addStudent);
router.post("/addFaculty", verifyAdmin, addTeacher);
router.get("/profile",verifyAdmin,adminProfile);

module.exports = router;
