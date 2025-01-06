const Notice = require("../models/notice");
exports.getNoticesBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const notices = await Notice.find({ school: schoolId });
    res.status(200).json({ notices });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addNotice = async (req, res) => {
  try {
    const { title, description, school, audience } = req.body;
    const notice = new Notice({ title, description, school, audience });
    await notice.save();
    res.status(201).json({ message: "Notice created successfully", notice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
