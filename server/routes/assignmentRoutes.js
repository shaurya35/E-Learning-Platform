const express = require("express");
const { addAssignment,addLecture } = require("../controllers/assignmentController");

const {checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-assignment", checkRole, addAssignment);
router.post("/add-lecture", checkRole, addLecture);

module.exports = router;
