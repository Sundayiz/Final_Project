const mongoose = require("mongoose");
const Parent = require("../models/parent");
const Student = require("../models/student");
const Performance = require("../models/performance");
const Notice = require("../models/notice");

exports.getChildren = async (req, res) => {
  try {
    const parentId = req.user.id;
    if (!mongoose.isValidObjectId(parentId)) {
      return res.status(400).json({ message: "Invalid parent ID" });
    }
    const children = await Student.find({ parent: parentId }).populate(
      "performance"
    );
    res.status(200).json({ success: true, children });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch children" });
  }
};

exports.getChildDailyPerformance = async (req, res) => {
  try {
    const { childId } = req.params;
    if (!mongoose.isValidObjectId(childId)) {
      return res.status(400).json({ message: "Invalid child ID" });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const performances = await Performance.find({
      student: childId,
      date: { $gte: todayStart },
    });

    res.status(200).json({ success: true, performances });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch daily performance" });
  }
};

exports.getChildSubjectPerformance = async (req, res) => {
  try {
    const { childId, subject } = req.params;

    if (!mongoose.isValidObjectId(childId)) {
      return res.status(400).json({ message: "Invalid child ID" });
    }

    const performances = await Performance.find({ student: childId, subject });

    res.status(200).json({ success: true, performances });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subjecct performance" });
  }
};
exports.getRelevantNotices = async (req, res) => {
  try {
    const parentId = req.user.id;

    if (!mongoose.isValidObjectId(parentId)) {
      return res.status(400).json({ messasge: "Invalid parent ID" });
    }
    const parent = await Parent.findById(parentId).populate("children");
    if (!parent) return res.status(404).json({ message: "parent not found" });

    const notices = await Notice.find({
      $0r: [{ audience: "all" }, { audience: "parents" }],
    });
    res.status(200).json({ success: true, notices });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notice" });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const parentId = req.user.id;
    const updates = req.body;
    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "No updates provided" });
    }
    const parent = await Parent.findByIdAndUpdate(parentId, updates, {
      new: true,
    });
    if (!parent) return res.status(404).json({ message: "Parent not found" });

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully", parent });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

exports.getChildDetails = async (req, res) => {
  try {
    const { childId } = req.params;
    if (mongoose.isValidObjectId(childId)) {
      return res.status(400).json({ message: "Invalid child ID" });
    }
    const child = await Student.findById(childId).populate("performance");
    if (!child) return res.status(404).json({ message: "Child not found" });
    res.status(200).json({ success: true, child });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch child details" });
  }
};
