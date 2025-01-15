const express = require("express");
const authMiddleware = require("../Auth/auth");
const {
  registerSchool,
  getallSchools,
  loginSchool,
  updateSchool,
  getSchoolOwnData,
} = require("../controllers/school.Controller");

const router = express.Router();
router.post("/register", registerSchool);
router.get("/all", getallSchools);
router.get("/login", loginSchool);
router.patch("/update", authMiddleware(["SCHOOL"]), updateSchool);
router.get("/fetch-single", authMiddleware(["SCHOOL"]), getSchoolOwnData);

module.exports = router;
