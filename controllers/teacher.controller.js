const Teacher = require("../models/teacher");
const Schedule = require("../models/schedule");

exports.getTeachersBySchool = async (req, res) => {
  try {
    const { schoolId } = req.param;
    const teachers = await Teacher.find({ school: schoolId });
    res.status(200).json({ teachers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTeacherBySchedules = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const schedules = await Schedule.find({ teacher: teacherId });
    res.status(200).json({ schedules });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addTeacher = async (req, res) => {
  try {
    const { name, email, password, school, subjects } = req.body;
    const teacher = new Teacher({ name, email, password, school, subjects });
    await teacher.save();
    res.status(201).json({ message: "Teacher added successfully", teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
