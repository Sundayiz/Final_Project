const mongoose = require("mongoose");
const { scheduler } = require("node:timers/promises");
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  subjects: [{ type: String }],
  schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedules" }],
});
module.exports = mongoose.model("Teacher", teacherSchema);
