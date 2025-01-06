const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
module.exports = mongoose.model("Schedule", scheduleSchema);
