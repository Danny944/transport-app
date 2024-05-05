const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
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
  car_type: {
    type: String,
    enum: ["maruwa", "car", "bus"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  max_passengers: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  current_passengers: {
    type: Number,
  },
  current_location_id: {
    type: mongoose.Schema.Types.ObjectId, // Referencing the 'Location' model
    ref: "Location", // Referencing the 'Location' model
  },
});

const drivers = mongoose.model("drivers", driverSchema);

module.exports = drivers;
