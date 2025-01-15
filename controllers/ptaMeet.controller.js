const PTAMeet = require("../models/ptaMeet");

exports.getPTAMeetsBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const ptaMeets = await PTAMeet.find({ school: schoolId });
    res
      .status(200)
      .json({ message: "PTA meetings fetched successfully", ptaMeets });
  } catch (err) {
    res.status(500),
      json({ message: "Error fetching PTA meeting", error: err.message });
  }
};

exports.addPTAMeet = async (req, res) => {
  try {
    const { date, agenda, school, attendees } = req.body;
    if (!date || !agenda || !school) {
      return res
        .status(404)
        .json({ message: "Date, agenda and  school are required" });
    }
    const ptaMeet = new PTAMeet({ date, agenda, school, attendees });
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
