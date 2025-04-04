const express = require("express");
const {
    facultySignIn,
} = require("../controllers/facultyController");


const router = express.Router();

router.post("/signin", facultySignIn);


module.exports = router;