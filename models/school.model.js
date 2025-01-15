const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  school_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  school_image: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});
module.exports = mongoose.model("School", schoolSchema);
