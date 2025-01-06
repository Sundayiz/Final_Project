const mongoose = require("mongoose");
const parentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
module.exports = mongoose.model("Parent", parentSchema);
