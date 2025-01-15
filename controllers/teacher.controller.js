const Teacher = require("../models/teacher");
const Schedule = require("../models/schedule");

exports.getTeachersBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    if (!schoolId) {
      return res.status(400).json({ message: "School ID is required" });
    }

    const teachers = await Teacher.find({ school: schoolId });
    res.status(200).json({ teachers });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error ftching teachers", error: err.message });
  }
};

exports.getTeacherBySchedules = async (req, res) => {
  try {
    const teacherId = req.user.id;
    if (!teacherId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const schedules = await Schedule.find({ teacher: teacherId });
    res.status(200).json({ schedules });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching schedules", error: err.message });
  }
};

exports.addTeacher = async (req, res) => {
  try {
    const { name, email, password, school, subjects } = req.body;
    if (!name || !email || !password || !school) {
      return res
        .status(400)
        .json({ message: "Name,email,password,and school are required" });
    }
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const teacher = new Teacher({ name, email, password, school, subjects });
    await teacher.save();
    res.status(201).json({ message: "Teacher added successfully", teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
