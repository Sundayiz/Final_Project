const express = require("express");
const authMiddleware = require("../Auth/auth");
const {
  registerSchool,
  getAllSchools,
  loginSchool,
  updateSchool,
  getSchoolOwnData,
} = require("../controllers/school.controller"); // Ensure file name is lowercase for consistency

const router = express.Router();

// Route to register a new school
router.post("/register", registerSchool);

// Route to fetch all schools
router.get("/all", getAllSchools);

// Route for school login
router.post("/login", loginSchool);

// Route to update school details (protected)
router.patch("/update", authMiddleware(["SCHOOL"]), updateSchool);

// Route to fetch single school details (protected)
router.get("/fetch-single", authMiddleware(["SCHOOL"]), getSchoolOwnData);

module.exports = router;
