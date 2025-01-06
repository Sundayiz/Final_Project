const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
  performance: [{ type: mongoose.Schema.Types.ObjectId, ref: "performance" }],
});
module.exports = mongoose.model("Student", studentSchema);
