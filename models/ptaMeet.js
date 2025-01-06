const mongoose = require("mongoose");
const ptaMeetSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  agenda: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  attendees: [
    {
      role: { type: String, enum: ["parent", "teacher"], required: true },
      attendeeId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "attendees.role",
      },
    },
  ],
});
module.exports = mongoose.model("PTAMeet", ptaMeetSchema);
