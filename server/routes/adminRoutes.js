const express = require("express");
const {
  signup,
  signin,
  addStudent,
} = require("../controllers/adminController");

const { verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/addStudent", verifyAdmin, addStudent);

module.exports = router;
