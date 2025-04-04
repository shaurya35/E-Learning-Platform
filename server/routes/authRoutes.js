const express = require("express");
const { refreshAccessToken ,logout} = require("../controllers/authController");

const router = express.Router();

router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);
module.exports = router;
