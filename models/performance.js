const mongoose = require("mongoose");
const performanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: { type: String, required: true },
  date: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  comments: { type: String },
});
module.exports = mongoose.model("Performance");
