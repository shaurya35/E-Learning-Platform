const express = require("express");
const router = express.Router();
const { studentSignIn, getStudentProfile } = require("../controllers/studentController");
const { verifyStudent } = require("../middlewares/authMiddleware");

router.post("/signin", studentSignIn);
router.get("/profile", verifyStudent, getStudentProfile); // Add this line

module.exports = router;