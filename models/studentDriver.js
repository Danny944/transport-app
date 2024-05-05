const mongoose = require("mongoose");

const studentDriverSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drivers",
    required: true,
  },
  from_location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  match_status: {
    type: String,
    enum: ["pending_approval, approved, completed"],
    required: true,
  },
});

const studentDriver = mongoose.model("studentDriver", studentDriverSchema);

module.exports = studentDriver;
