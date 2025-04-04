const express = require("express");
const router = express.Router();
const { studentSignIn } = require("../controllers/studentController");


router.post("/signin", studentSignIn);


module.exports = router;