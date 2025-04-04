const express = require("express");
const router = express.Router();
const { 
  facultySignIn, 
  getFacultyProfile ,
  facultyRefreshAccessToken
} = require("../controllers/facultyController");
const { verifyFaculty } = require("../middlewares/authMiddleware");

router.post("/signin", facultySignIn);
router.get("/profile", verifyFaculty, getFacultyProfile); // Add profile route
router.post("/refresh", facultyRefreshAccessToken);

module.exports = router;