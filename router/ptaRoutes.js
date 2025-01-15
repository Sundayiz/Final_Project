const express = require("express");
const { authenticate, authorize } = require("../Middleware/authMiddleware");
const {
  getPTAMeetsBySchool,
  addPTAMeet,
} = require("../controllers/ptaMeet.Controller");

const router = express.Router();
router.get(
  "/school/:schoolId",
  authenticate,
  authorize(["admin", "teacher", "parent"]),
  getPTAMeetsBySchool
);
router.post("/", authenticate, authorize(["admin"]), addPTAMeet);
module.exports = router;
