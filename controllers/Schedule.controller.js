const mongoose = require("mongoose");
const Schedule = require("../models/schedule");
exports.getSchedulesByTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const schedules = await Schedule.find({ teacher: teacherId });
    res
      .status(200)
      .json({ mesage: "Schedule fetched successfully", data: schedules });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching schedules",
      error: err.message || "An unexpected error occurred",
    });
  }
};
exports.addSchedule = async (req, res) => {
  try {
    const { title, description, date, teacher, students } = req.body;
    if (!title || !description || !data || !teacher) {
      return res.status(400).json({
        message: "Title description, date, and teacher are required",
      });
    }
    const schedule = new Schedule({
      title,
      description,
      date,
      teacher,
      students,
    });
    await schedule.save();
    res.status(201).json({ message: "Schedule added successfully", schedule });
  } catch (err) {
    res.status(500).json({
      message: "Error adding schedule",
      error: err.message || "An unexpected error occurred",
    });
  }
};
