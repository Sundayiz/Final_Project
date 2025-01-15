const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  school: { type: mongoose.Schema.ObjectId, ref: "School" },
  class_text: { type: String, required: true },
  class_num: { type: Number, required: true },
  attendee: { type: mongoose.Schema.ObjectId, ref: "Teacher" },
});
module.exports = mongoose.model("Class", classSchema);
