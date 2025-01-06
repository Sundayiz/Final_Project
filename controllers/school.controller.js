const School = require("../models/school");
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json({ schools });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addSchool = async (req, res) => {
  try {
    const { name, address, contactNumber } = req.body;
    const school = new School({ name, address, contactNumber });
    await school.save();
    res.status(201).json({ message: "School added successfully", school });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const { id } = req.param;
    const school = await School.findById(id).populate(
      "students teachers parents ptaMeets"
    );
    if (!school) return res.status(404).json({ message: "School not found" });
    res.status(200).json({ school });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
