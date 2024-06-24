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
  location: {
    type: String,
    enum: ["Point"],
    coordinates: [Number],
  },
});

const students = mongoose.model("students", studentSchema);

module.exports = students;
