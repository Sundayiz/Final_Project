const Notice = require("../models/notice");
exports.getNoticesBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    if (!schoolId) {
      return res.status(400).json({ message: "School ID is required" });
    }
    const { page = 1, limit = 10 } = req.query;
    const notices = await Notice.find({ school: schoolId })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Notice.countDocuments({
      school: schoolId,
    });
    res.status(200).json({ notices });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addNotice = async (req, res) => {
  try {
    const { title, description, school, audience } = req.body;
    if (!title || !description || !school || !audience) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const validAudiences = ["students", "teachers", "parents", "all"];
    if (!validAudiences.includes(audience)) {
      return res.status(400).json({
        messsage: "Invalid audience type",
      });
    }
    const notice = new Notice({ title, description, school, audience });

    try {
      await notice.save();
      res.status(201).json({ message: "Notice created successfully", notice });
    } catch (saveError) {
      res
        .status(400)
        .json({ message: " Failed to save notice", error: saveError.message });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the notice" });
  }
};
