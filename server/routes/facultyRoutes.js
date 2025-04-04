const express = require("express");
const router = express.Router();
const { 
  facultySignIn, 
  getFacultyProfile,
  facultyRefreshAccessToken,
  facultyLogout
} = require("../controllers/facultyController");
const { verifyFaculty } = require("../middlewares/authMiddleware");

// Authentication routes
router.post("/signin", facultySignIn);
router.post("/refresh", facultyRefreshAccessToken);
router.post("/logout", verifyFaculty, facultyLogout); // Protected logout route

// Profile routes
router.get("/profile", verifyFaculty, getFacultyProfile);

module.exports = router;