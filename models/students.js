const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  current_location_id: {
    type: mongoose.Schema.Types.ObjectId, // Referencing the 'Location' model
    ref: "Location", // Referencing the 'Location' model
  },
});

const students = mongoose.model("students", studentSchema);

module.exports = students;
