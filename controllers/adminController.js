const Admin = require("../models/admin");
const Teacher = require("../models/teacher");
const Parent = require("../models/parent");
const Student = require("../models/student");
const PTAMeet = require("../models/ptaMeet");
const Notice = require("../models/notice");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    const parents = await Parent.find();
    const students = await Student.find();
    res.status(200).json({ teachers, parents, students });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Check if admin exist
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating admin", error: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  const { userId, role } = req.body;
  try {
    let model;
    if (role === "teacher") model = Teacher;
    else if (role === "parent") model = Parent;
    else if (role === "student") model = Student;
    else return res.status(400).json({ message: "Invalid role" });

    const user = await model.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "${role} deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};
exports.schedulePTAMeeting = async (req, res) => {
  const { date, agenda, school } = req.body;
  try {
    const ptaMeet = new this.schedulePTAMeeting({ date, agenda, school });
    await ptaMeet.save();

    res
      .status(201)
      .json({ message: "PTA meeting scheduled successfully", ptaMeet });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error scheduling PTA meeting", error: err.message });
  }
};
exports.deletePTAMeeting = async (req, res) => {
  const { meetingId } = req.params;
  try {
    const ptaMeet = await PTAMeet.findByIdAndDelete(meetingId);
    if (!ptaMeet)
      return res.status(404).json({ message: "PTA meeting not found" });

    res.status(200).json({ message: "PTA meeting deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ messsage: "Error deleting PTA meeting", error: err.message });
  }
};
exports.deleteNotice = async (req, res) => {
  const { noticeId } = req.params;
  try {
    const notice = await Notice.findByIdAndDelete(noticeId);
    if (!notice) return res.status(404).json;
  } catch (err) {
    res
      .status(500)
      .json({ messsage: "Error deleting notice", error: err.message });
  }
};
