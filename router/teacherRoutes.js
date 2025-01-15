const express = require("express");
const { authenticate, authorize } = require("../Middleware/authMiddleware");
const {
  getTeachersBySchool,
  getTeacherSchedules,
  addTeacher,
} = require("../controllers/teacher.Controller");
const router = express.Router();
router.get(
  "/school/:schoolId",
  authenticate,
  authorize(["admin"]),
  getTeachersBySchool
);
router.get(
  "/schedules",
  authenticate,
  authorize(["teacher"]),
  getTeacherSchedules
);
router.post("/", authenticate, authorize(["admin"]), addTeacher);

module.exports = router;
