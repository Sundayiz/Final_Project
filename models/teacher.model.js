const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
  school: { type: mongoose.Schema.ObjectId, ref: "School" },
  email: { type: String, required: true },
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  teacher_image: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
