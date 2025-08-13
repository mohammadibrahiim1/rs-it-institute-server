const express = require("express");
const { getAllCourses } = require("../controllers/courses.controller");
const router = express.Router();

router.get("/get/all", getAllCourses); 

module.exports = router;
