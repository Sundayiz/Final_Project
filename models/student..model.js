const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  guardian: {
    type: String,
    required: true,
  },
  guardian_phone: { type: String, required: true },
  student_image: { type: String, required: true },
});
module.exports = mongoose.model("Student", studentSchema);
