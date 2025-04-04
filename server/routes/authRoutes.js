const express = require("express");
const { refreshAccessToken } = require("../controllers/authController");

const router = express.Router();

router.post("/refresh", refreshAccessToken);

module.exports = router;
