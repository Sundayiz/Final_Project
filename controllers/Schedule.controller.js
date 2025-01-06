const Schedule = require("../models/schedule");
exports.getSchedulesByTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const schedules = await Schedule.find({ teacher: teacherId });
    res.status(200).json({ schedules });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addSchedule = async (req, res) => {
  try {
    const { title, description, date, teacher, students } = req.body;
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
    res.status(500).json({ message: err.message });
  }
};
