const express = require("express");
const router = express.Router();
const {verifyFaculty} = require("../middlewares/authMiddleware");
const { sendNotification } = require("../controllers/notificationController");

// POST /api/faculty/notification
router.post("/", verifyFaculty, sendNotification);

module.exports = router;
