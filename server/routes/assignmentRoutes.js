const express = require("express");
const { addAssignment } = require("../controllers/assignmentController");

const {checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-assignment", checkRole, addAssignment);

module.exports = router;
