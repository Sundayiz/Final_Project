const Performance = require("../models/performance");
exports.getPerformanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const performance = await Performance.find({ student: studentId });
    res.status(200).json({ performance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addPerformance = async (req, res) => {
  try {
    const { student, subject, score, maxScore, comments } = req.body;
    const performance = new Performance({
      student,
      subject,
      score,
      maxScore,
      comments,
    });
    await performance.save();
    res
      .status(201)
      .json({ message: "Preformance added successfully", performance });
  } catch {
    err;
  }
  {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePerformance = async (req, res) => {
  try {
    const { id } = req.param;
    const updates = req.body;
    const Performance = await Performance.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!performance)
      return res.status(404).json({ message: "Performancenot found" });
    res
      .status(200)
      .json({ message: "Performance updated successfully", performance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
