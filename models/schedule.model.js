const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  school: { type: mongoose.SchemaObjectId, ref: "School" },
  teacher: { type: mongoose.SchemaObjectId, ref: "Teacher" },
  subject: { type: mongoose.SchemaObjectId, ref: "Subject" },
  class: { type: mongoose.SchemaObjectId, ref: "Class" },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createsAt: { type: Date, default: new Date() },
});
module.exports = mongoose.model("Schedule", scheduleSchema);
