const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  school: { type: mongoose.SchemaObjectId, ref: "School" },
  subject_name: { type: String, required: true },
  subject_codename: { type: String, default: new Date() },
});
module.exports = mongoose.model("subject", subjectSchema);
