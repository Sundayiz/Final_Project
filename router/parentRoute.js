const express = require("express");
const { authenticate, authorize } = require("../Middleware/authMiddleware");
const parentController = require("../controllers/parent.Controller");

const router = express.Router();

router.get(
  "/children",
  authenticate,
  authorize(["parent"]),
  parentController.getChild
);
router.get(
  "/child/:childId/daily-performance",
  authenticate,
  auththorize(["parent"]),
  parentController.getChildDailyPerformance
);
router.get(
  "/child/:childId/subject/:subject",
  authenticate,
  authorize(["parent"]),
  parentController.getChildSubjectPerformance
);
router.get(
  "/notices",
  authenticate,
  authorize(["parent"]),
  parentController.getRelevantNotices
);
router.put(
  "profile",
  authenticate,
  authorize(["parent"]),
  parentController.updateProfile
);
router.get(
  "/child/:childId",
  authenticate,
  authorize(["parent"]),
  parentController.getChildDetails
);
module.exports = router;
