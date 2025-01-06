const mongoose = require("mongoose");
const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }],
  ptaMeets: [{ type: mongoose.Schema.Types.ObjectId, ref: "PTAMeet" }],
});
module.exports = mongoose.model("School", schoolSchema);
